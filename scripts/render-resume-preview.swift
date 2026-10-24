// Renders the resume PDF's first page to a PNG, shown on phones (which can't preview PDFs inline).
// macOS only (PDFKit). Run after updating the resume: npm run resume:preview
import AppKit
import PDFKit

let args = CommandLine.arguments
guard args.count == 4, let document = PDFDocument(url: URL(fileURLWithPath: args[1])), let page = document.page(at: 0), let width = Double(args[3]) else {
  fatalError("Usage: render-resume-preview.swift <input.pdf> <output.png> <width in px>")
}
let bounds = page.bounds(for: .mediaBox)
let scale = width / bounds.width
let size = NSSize(width: bounds.width * scale, height: bounds.height * scale)
let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: Int(size.width), pixelsHigh: Int(size.height), bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
let context = NSGraphicsContext(bitmapImageRep: bitmap)!
// The page is drawn on white, since PDFs often leave their background transparent.
context.cgContext.setFillColor(NSColor.white.cgColor)
context.cgContext.fill(CGRect(origin: .zero, size: size))
context.cgContext.scaleBy(x: scale, y: scale)
page.draw(with: .mediaBox, to: context.cgContext)
try! bitmap.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: args[2]))
