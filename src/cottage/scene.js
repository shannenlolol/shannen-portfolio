import { frame, mix, getTimeOfDay, subscribeTimeOfDay } from "./timeOfDay";
// Interactive SVG scene adapted from the supplied cottage reference.

export function initializeScene(){
  var disposed=false, timers=new Set(), frames=new Set();
  var events=new AbortController();
  function setTimeout(fn,delay){var id=window.setTimeout(function(){timers.delete(id);if(!disposed)fn()},delay);timers.add(id);return id}
  function clearTimeout(id){window.clearTimeout(id);timers.delete(id)}
  function requestAnimationFrame(fn){var id=window.requestAnimationFrame(function(now){frames.delete(id);if(!disposed)fn(now)});frames.add(id);return id}
  var NS='http://www.w3.org/2000/svg';
  var root=document.documentElement, hero=document.getElementById('landscape'), scene=document.getElementById('scene');
  var RM=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp=function(v,a,b){a=a===undefined?0:a;b=b===undefined?1:b;return Math.min(b,Math.max(a,v))};
  function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  function el(tag,attrs,parent){var e=document.createElementNS(NS,tag);for(var k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e}

  var OBJ={'--wall':'#EADFC5','--roof':'#6D4A45','--door':'#8B5E3C','--r1':'#7D9A78','--r2':'#4E6549','--r3':'#C9A15B','--moss':'#6E9A55','--face':'#243024','--pot':'#A26F49','--pot2':'#8A5B3A','--leaf':'#7FA067','--leafS':'#3F5A31','--stem':'#4C6B3C','--f1':'#E58FB0','--f2':'#F1CF62','--f3':'#F5F1E3','--f4':'#B69BE0','--wood':'#8B633F','--wood2':'#6E4C30','--wood3':'#A4784D'};

  var sun=document.getElementById('sun'), moon=document.getElementById('moon');
  var stars=document.getElementById('stars'), win1=document.getElementById('win1'), win2=document.getElementById('win2');
  var wg1=document.getElementById('wg1'), wg2=document.getElementById('wg2'), lamp=document.getElementById('lamp'), lampG=document.getElementById('lampG');
  var hFar=document.getElementById('hFar'), hMid=document.getElementById('hMid'), hNear=document.getElementById('hNear');
  var sunCircles=sun.querySelectorAll('.sc');
  var F={ff:0,n:0};

  function update(s){
    var f=frame(s);F=f;var st=root.style;
    var sh=function(c){return mix(mix(c,'#F2A45E',f.w*.2),'#16213F',f.n*.6)};
    st.setProperty('--sky-top',f.top);st.setProperty('--sky-bot',f.bot);
    var far=mix(sh('#8FB08A'),f.bot,.42), mid=mix(sh('#6E9A6A'),f.bot,.14);
    var page=mix(mix('#D5E4B8','#F2C98A',f.w*.18),'#131C20',f.n);
    hFar.setAttribute('fill',far);hMid.setAttribute('fill',mid);hNear.setAttribute('fill',page);
    st.setProperty('--page',page);st.setProperty('--pine',mix(mid,'#1F3323',.4));
    for(var k in OBJ)st.setProperty(k,sh(OBJ[k]));
    st.setProperty('--cloud',mix(sh(mix('#FFFFFF',f.bot,.3)),f.bot,f.n*.5));
    st.setProperty('--eye',mix('#BDE9C0','#E9FFC9',f.g));
    var p=clamp(s/.78,0,1.05);
    sun.setAttribute('transform',mq.matches?'translate('+(mobileLeft+mobileWidth*.58)+' '+(mobileSkyY-48)+') scale(.65)':'translate('+(800+p*540).toFixed(1)+' '+(600-Math.sin(Math.PI*Math.min(p,1))*235).toFixed(1)+')');
    sun.setAttribute('opacity',(1-clamp((s-.62)/.16)).toFixed(3));
    for(var i=0;i<sunCircles.length;i++)sunCircles[i].setAttribute('fill',f.sun);
    var mo=clamp((s-.7)/.14), u=clamp((s-.7)/.3);
    moon.setAttribute('transform',mq.matches?'translate('+(mobileLeft+mobileWidth*.58)+' '+(mobileSkyY-48)+') scale(.8)':'translate(985 '+(425-u*65).toFixed(1)+')');
    moon.setAttribute('opacity',mo.toFixed(3));
    stars.setAttribute('opacity',f.st.toFixed(3));
    var glass=mix('#9DB7C4','#FFD98A',f.g);
    win1.setAttribute('fill',glass);win2.setAttribute('fill',glass);
    wg1.setAttribute('opacity',(f.g*.9).toFixed(3));wg2.setAttribute('opacity',(f.g*.9).toFixed(3));
    lamp.setAttribute('fill',mix('#B9C79A','#FFE39A',f.g));lampG.setAttribute('opacity',f.g.toFixed(3));
    if(RM)drawFlies(0,0);
  }

  var r=rng(7), i;
  // Each star keeps its place as a fraction of the sky, so phones can spread the stars over the narrower sky they
  // show (see layout) instead of showing only the few that fall in their slice of the wide scene.
  var starSpots=[];
  for(i=0;i<46;i++){
    var sx=r(), sy=r();
    var c=el('circle',{cx:(sx*1440).toFixed(0),cy:(110+sy*320).toFixed(0),r:(.8+r()*1.1).toFixed(2),fill:'#F6F2DE'},stars);
    c.setAttribute('class','tw');c.style.animationDelay=(r()*3).toFixed(2)+'s';
    starSpots.push({el:c,x:sx,y:sy});
  }
  var pines=document.getElementById('pines');
  [[70,691,1],[104,689,.8],[388,694,1.1],[428,692,.85],[700,654,1.2],[740,646,.9],[770,640,1],[930,600,1],[966,592,.8],[1200,560,1.1],[1245,557,.9],[1290,558,1.2],[1385,556,1],[1424,552,.8]].forEach(function(p){
    var g=el('use',{href:'#pine',transform:'translate('+p[0]+' '+p[1]+') scale('+p[2]+')'},pines);
  });
  var NY=[[-80,800],[108,788],[288,791],[640,790],[967,765],[1280,772],[1520,762]];
  function nearY(x){for(var j=0;j<NY.length-1;j++)if(x<=NY[j+1][0])return NY[j][1]+(x-NY[j][0])/(NY[j+1][0]-NY[j][0])*(NY[j+1][1]-NY[j][1]);return 762}
  var gd='';
  for(var gx=-60;gx<1500;gx+=17+Math.floor(r()*10)){
    var gy=nearY(gx)+3, hh=8+r()*10, lean=(r()-.5)*10;
    gd+='M'+gx+' '+gy+' q'+(lean*.4).toFixed(1)+' '+(-hh*.6).toFixed(1)+' '+lean.toFixed(1)+' '+(-hh).toFixed(1)+' ';
  }
  var gp=el('path',{d:gd,fill:'none','stroke-width':'2.2','stroke-linecap':'round'},document.getElementById('grass'));gp.setAttribute('class','sstem');
  var fl=[];
  // Give each bloom its own space, with a little jitter for a natural scatter.
  var flowerCount=32, flowerSpacing=1520/flowerCount;
  for(i=0;i<flowerCount;i++){
    var fx=-40+(i+.25+r()*.5)*flowerSpacing;
    fl.push({x:fx,y:nearY(fx)+8+Math.pow(r(),1.3)*82,k:1+Math.floor(r()*4),h:r()});
  }
  fl.sort(function(a,b){return a.y-b.y});
  var fg=document.getElementById('flowers');
  fl.forEach(function(o){
    o.element=el("g",{},fg);
    var sc=.7+(o.y-770)/130*.75, sh2=(18+o.h*16)*sc;
    var stem=el('path',{d:'M'+o.x.toFixed(1)+' '+o.y.toFixed(1)+' q2 '+(-sh2*.5).toFixed(1)+' 0 '+(-sh2).toFixed(1),fill:'none','stroke-width':(1.8*sc).toFixed(2),'stroke-linecap':'round'},o.element);stem.setAttribute('class','sstem');
    var head=el('circle',{cx:(o.x).toFixed(1),cy:(o.y-sh2).toFixed(1),r:(5.5*sc).toFixed(2)},o.element);head.setAttribute('class','ff'+o.k);
    if(o.k!==2){el('circle',{cx:(o.x).toFixed(1),cy:(o.y-sh2).toFixed(1),r:(2*sc).toFixed(2),fill:'#F1CF62'},o.element)}
  });

  var pars=Array.prototype.map.call(scene.querySelectorAll('.par'),function(e){return {el:e,a:parseFloat(e.getAttribute('data-a'))}});
  var mq=window.matchMedia('(max-width: 820px)'), mobileWidth=880, mobileLeft=560, mobileSkyY=470;
  var signPlanks=Array.from(document.querySelectorAll('#signpost .plankA')).map(function(link){
    var polygon=link.querySelector('polygon'), label=link.querySelector('text');
    return {polygon:polygon,label:label,points:polygon.getAttribute('points')};
  });
  function layout(){
    var compact=mq.matches;
    var bounds=hero.getBoundingClientRect();
    mobileWidth=900*bounds.width/bounds.height;mobileLeft=1000-mobileWidth/2;
    var invitation=document.querySelector('.home-content .garden-invitation');
    if(invitation)mobileSkyY=Math.max(470,(invitation.getBoundingClientRect().bottom+window.scrollY-bounds.top+48)/bounds.height*900);
    // Leave clear ground beneath the full signpost and robot/pot footprints.
    // Padding also covers their different parallax amplitudes.
    var clearGround=compact?[[mobileLeft+mobileWidth*.02,mobileLeft+mobileWidth*.57],[mobileLeft+mobileWidth*.59,mobileLeft+mobileWidth*.90]]:[[180,680],[800,1045]];
    fl.forEach(function(flower){
      flower.element.style.display=clearGround.some(function(zone){return flower.x>=zone[0]&&flower.x<=zone[1]})?'none':'';
    });
    scene.setAttribute('viewBox',compact?mobileLeft+' 0 '+mobileWidth+' 900':'0 0 1440 900');
    // Keep mobile clouds below the copy; let the hills naturally mask their lower edges.
    document.getElementById('cloud-left').setAttribute('transform',compact?'translate('+(mobileLeft+mobileWidth*.15)+' '+(mobileSkyY+45)+') scale(.6)':'translate(720 320) scale(.6)');
    document.getElementById('cloud-middle').setAttribute('transform',compact?'translate('+(mobileLeft+mobileWidth*.92)+' '+(mobileSkyY+10)+') scale(.55)':'translate(1160 280) scale(.75)');
    ['cloud-right','cloud-low-left','cloud-low-middle'].forEach(function(id){document.getElementById(id).style.display=compact?'none':''});
    // Phones: every other star, spread over the visible width and down to just above the hills.
    starSpots.forEach(function(star,index){
      star.el.setAttribute('cx',(compact?mobileLeft+star.x*mobileWidth:star.x*1440).toFixed(0));
      star.el.setAttribute('cy',(compact?60+star.y*400:110+star.y*320).toFixed(0));
      star.el.style.display=compact&&index%2?'none':'';
    });
    signPlanks.forEach(function(plank,index){
      var y=628+index*34;
      plank.polygon.setAttribute('points',compact?(index%2===0
        ?'208,'+(y-14)+' 78,'+(y-14)+' 60,'+y+' 78,'+(y+14)+' 208,'+(y+14)
        :'212,'+(y-14)+' 342,'+(y-14)+' 360,'+y+' 342,'+(y+14)+' 212,'+(y+14)):plank.points);
      plank.label.style.fontSize=compact?'24px':'';
      plank.label.setAttribute('y',y+(compact?8:5));
    });
    document.getElementById('cottage').setAttribute('transform',compact?'translate('+(mobileLeft+mobileWidth*.81)+' 620) scale(.85)':'translate(1120 610)');
    document.getElementById('signpost').setAttribute('transform',compact
      ?'translate('+(mobileLeft+mobileWidth*.30)+' 810) scale('+(mobileWidth*.52/300)+') translate(-210 -824)'
      :'translate(430 840) scale(1.08) translate(-210 -824)');
    document.getElementById('robot').setAttribute('transform',compact
      ?'translate('+(mobileLeft+mobileWidth*.68)+' 810) scale('+(mobileWidth/880*1.55)+')'
      :'translate(880 812) scale(1.15)');
  }
  layout();
  window.addEventListener('resize',function(){layout();update(getTimeOfDay())},{signal:events.signal});
  document.fonts.ready.then(function(){if(!disposed){layout();update(getTimeOfDay())}});

  var cv=document.getElementById('flies'), cx=cv.getContext('2d'), W=0,H=0, flies=[], mouse={on:false,x:0,y:0};
  function size(){
    var b=hero.getBoundingClientRect(), dpr=Math.min(2,window.devicePixelRatio||1), ow=W, oh=H;
    W=b.width;H=b.height;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);
    if(!flies.length){for(var q=0;q<(mq.matches?12:24);q++)flies.push({x:Math.random()*W,y:H*(.4+Math.random()*.55),vx:0,vy:0,p:Math.random()*6.28,sp:.6+Math.random()*1.2})}
    else if(ow&&oh){flies.forEach(function(f){f.x*=W/ow;f.y*=H/oh})}
    if(RM)drawFlies(0,0);
  }
  function drawFlies(t,dt){
    cx.clearRect(0,0,W,H);
    if(F.ff<.02)return;
    var k=dt*60;
    for(var q=0;q<flies.length;q++){
      var f=flies[q];
      if(!RM){
        f.vx+=(Math.random()-.5)*.06*k;f.vy+=(Math.random()-.5)*.06*k;
        if(mouse.on){var dx=mouse.x-f.x,dy=mouse.y-f.y,d=Math.hypot(dx,dy);if(d<240&&d>6){f.vx+=dx/d*.05*k;f.vy+=dy/d*.05*k}}
        if(f.y<H*.3)f.vy+=.05*k;if(f.y>H*.98)f.vy-=.05*k;
        f.vx*=.96;f.vy*=.96;var sp=Math.hypot(f.vx,f.vy);if(sp>1.4){f.vx*=1.4/sp;f.vy*=1.4/sp}
        f.x+=f.vx*k;f.y+=f.vy*k;if(f.x<-10)f.x=W+10;if(f.x>W+10)f.x=-10;
      }
      var a=F.ff*(.35+.65*(.5+.5*Math.sin(t*f.sp+f.p)));
      var g=cx.createRadialGradient(f.x,f.y,0,f.x,f.y,14);
      g.addColorStop(0,'rgba(244,247,154,'+a.toFixed(3)+')');g.addColorStop(.25,'rgba(244,247,154,'+(a*.4).toFixed(3)+')');g.addColorStop(1,'rgba(244,247,154,0)');
      cx.fillStyle=g;cx.fillRect(f.x-14,f.y-14,28,28);
    }
  }
  size();window.addEventListener('resize',size,{signal:events.signal});

  var pupils=document.querySelectorAll('.pup'), eyes=document.getElementById('eyes');
  var tx=0,ty=0,px=0,py=0;
  window.addEventListener('mousemove',function(e){
    if(RM)return;
    tx=(e.clientX/window.innerWidth-.5)*2;ty=(e.clientY/window.innerHeight-.5)*2;
    var b=hero.getBoundingClientRect();mouse.x=e.clientX-b.left;mouse.y=e.clientY-b.top;mouse.on=e.clientY>=b.top&&e.clientY<=b.bottom;
    var r2=eyes.getBoundingClientRect(),ex=r2.left+r2.width/2,ey=r2.top+r2.height/2,dx=e.clientX-ex,dy=e.clientY-ey,d=Math.hypot(dx,dy)||1,k=Math.min(1,d/300);
    for(var q=0;q<pupils.length;q++)pupils[q].setAttribute('transform','translate('+(dx/d*k*2.6).toFixed(2)+' '+(dy/d*k*2.2).toFixed(2)+')');
  },{signal:events.signal});
  var visible=true;
  var observer=new IntersectionObserver(function(entries){visible=entries[0].isIntersecting});observer.observe(hero);
  var last=performance.now();
  function tick(now){
    var dt=Math.min(.05,(now-last)/1000||.016);last=now;
    if(!visible||document.hidden){requestAnimationFrame(tick);return;}
    px+=(tx-px)*Math.min(1,dt*4);py+=(ty-py)*Math.min(1,dt*4);
    for(var q=0;q<pars.length;q++)pars[q].el.style.transform='translate('+(px*pars[q].a).toFixed(2)+'px,'+(py*pars[q].a*.35).toFixed(2)+'px)';
    drawFlies(now/1000,dt);
    requestAnimationFrame(tick);
  }
  if(!RM)requestAnimationFrame(tick);

  if(!RM)(function blinkLoop(){setTimeout(function(){eyes.classList.add('blink');setTimeout(function(){eyes.classList.remove('blink');blinkLoop()},130)},2800+Math.random()*3400)})();

  var LINES=[["hi! i’m the garden robot.","click me to water the seed."],["a sprout! good start.","keep going, it likes water."],["look at it go.","one more should do it."],["it bloomed! that’s how","shannen builds things too."],["let’s plant another.","try the time-of-day slider."]];
  var bubble=document.getElementById('bubble'),b1=document.getElementById('b1'),b2=document.getElementById('b2'),bt;
  function say(i,ms){b1.textContent=LINES[i][0];b2.textContent=LINES[i][1];bubble.classList.add('on');clearTimeout(bt);bt=setTimeout(function(){bubble.classList.remove('on')},ms||3800)}
  var can=document.getElementById('can'),drops=document.getElementById('drops'),sprout=document.getElementById('sprout');
  var plants=[document.querySelector('.g1'),document.querySelector('.g2'),document.querySelector('.g3')];
  var stage=0,busy=false;
  function show(n){plants.forEach(function(p,q){p.classList.toggle('show',n===q+1)})}
  function water(){
    if(busy)return;busy=true;
    can.classList.add('tilt');drops.classList.add('on');
    sprout.classList.remove('wiggle');void sprout.getBoundingClientRect();sprout.classList.add('wiggle');
    setTimeout(function(){stage=(stage+1)%4;show(stage);say(stage===0?4:stage)},900);
    setTimeout(function(){can.classList.remove('tilt');drops.classList.remove('on');busy=false},1700);
  }
  var bb=document.getElementById('botbtn');
  bb.addEventListener('click',water);
  bb.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();water()}});
  setTimeout(function(){say(0,5200)},1800);

  update(getTimeOfDay());
  var unsubscribe=subscribeTimeOfDay(update);
  return function(){
    disposed=true;events.abort();observer.disconnect();unsubscribe();
    timers.forEach(function(id){window.clearTimeout(id)});frames.forEach(function(id){window.cancelAnimationFrame(id)});
    ['stars','pines','grass','flowers'].forEach(function(id){document.getElementById(id)?.replaceChildren()});
  };
}
