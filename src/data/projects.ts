export const projects = [
  {
    name: "Meal Macro Insights",
    slug: "meal-macro-insights",
    kind: "Web application",
    technologies: ["React", "OpenAI Vision", "Firebase"],
    detail: "Photo-based meal logging with daily nutrition tracking and personalised food insights.",
    links: [{ label: "Watch demo", href: "https://youtu.be/A7NNEmvlFB8" }, { label: "Source code", href: "https://github.com/shannenlolol/meal-macro-insights" }],
    category: "React · OpenAI Vision · Firebase",
    description:
      "Estimate meal macros and health insights from a photo, with authentication and real-time storage.",
    image: "mealmacroinsights.jpeg",
  },
  {
    name: "Image Editor",
    slug: "image-editor",
    kind: "Creative tool",
    technologies: ["Python", "Flask", "rembg", "JavaScript"],
    detail: "Crop, rotate, replace backgrounds, and export a single image or an entire batch.",
    links: [{ label: "Try the editor", href: "https://shannenlolol.pythonanywhere.com/" }, { label: "Source code", href: "https://github.com/shannenlolol/image-editor-web-app" }],
    category: "Python · Flask · Image processing",
    description:
      "Remove backgrounds, resize images, and make quick photo edits directly in the browser.",
    image: "image-editor/after.png",
  },
  {
    name: "Grocery Guru",
    slug: "grocery-guru",
    kind: "Mobile application",
    technologies: [],
    detail: "Keep shopping organised with category-based lists and a built-in price-per-unit comparison.",
    links: [{ label: "Source code", href: "https://github.com/shannenlolol/grocery-guru" }],
    category: "Everyday tools",
    description:
      "Organise your grocery list and compare products to find better value on your next shop.",
    image: "grocery-guru.jpeg",
  },
];
