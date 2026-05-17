#!/usr/bin/env node

/**
 * Minification Script for CertPrep
 * Minifies CSS and JavaScript files
 * Usage: node scripts/minify.js
 */

const fs = require('fs');
const path = require('path');

// Color output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

/**
 * Minify CSS by removing comments, extra whitespace, and unnecessary characters
 */
function minifyCSS(inputFile, outputFile) {
  try {
    log(colors.blue, `\n📦 Minifying CSS: ${inputFile}`);
    
    let css = fs.readFileSync(inputFile, 'utf8');
    const originalSize = Buffer.byteLength(css, 'utf8');
    
    // Remove comments
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Normalize whitespace
    css = css.replace(/\s+/g, ' ');
    
    // Remove spaces around special characters
    css = css.replace(/\s*([{};:,>+~])\s*/g, '$1');
    
    // Remove unnecessary semicolons before closing braces
    css = css.replace(/;}/g, '}');
    
    // Remove spaces in URLs
    css = css.replace(/url\s*\(\s*/g, 'url(');
    css = css.replace(/\s*\)/g, ')');
    
    // Trim
    css = css.trim();
    
    fs.writeFileSync(outputFile, css, 'utf8');
    
    const minifiedSize = Buffer.byteLength(css, 'utf8');
    const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
    
    log(colors.green, `✓ CSS minified: ${originalSize} → ${minifiedSize} bytes (-${reduction}%)`);
    
    return true;
  } catch (err) {
    log(colors.red, `✗ Error minifying CSS: ${err.message}`);
    return false;
  }
}

/**
 * Minify JavaScript by removing comments and extra whitespace
 * (Basic minification without breaking code)
 */
function minifyJS(inputFile, outputFile) {
  try {
    log(colors.blue, `\n📦 Minifying JavaScript: ${inputFile}`);
    
    let js = fs.readFileSync(inputFile, 'utf8');
    const originalSize = Buffer.byteLength(js, 'utf8');
    
    // Remove single-line comments (but not URLs)
    js = js.replace(/\/\/(?!.*:\/\/).*$/gm, '');
    
    // Remove multi-line comments
    js = js.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove unnecessary whitespace (but preserve important ones)
    js = js.replace(/\s+/g, ' ');
    
    // Remove spaces around operators and brackets (but preserve function calls)
    js = js.replace(/\s*([{};:,=()[\]])\s*/g, '$1');
    
    // Fix function declarations that got broken
    js = js.replace(/function\s*\(/g, 'function(');
    js = js.replace(/\)\s*\{/g, '){');
    
    // Trim
    js = js.trim();
    
    fs.writeFileSync(outputFile, js, 'utf8');
    
    const minifiedSize = Buffer.byteLength(js, 'utf8');
    const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
    
    log(colors.green, `✓ JS minified: ${originalSize} → ${minifiedSize} bytes (-${reduction}%)`);
    
    return true;
  } catch (err) {
    log(colors.red, `✗ Error minifying JS: ${err.message}`);
    return false;
  }
}

/**
 * Gzip compress a file for size comparison
 */
function getGzipSize(filePath) {
  try {
    const zlib = require('zlib');
    const content = fs.readFileSync(filePath);
    const gzipped = zlib.gzipSync(content);
    return Buffer.byteLength(gzipped, 'utf8');
  } catch (err) {
    return null;
  }
}

/**
 * Main execution
 */
async function main() {
  log(colors.blue, '\n🚀 CertPrep Minification Process');
  log(colors.blue, '================================\n');
  
  const baseDir = path.join(__dirname, '..');
  
  const files = [
    {
      input: path.join(baseDir, 'styles.css'),
      output: path.join(baseDir, 'styles.min.css'),
      type: 'css'
    },
    {
      input: path.join(baseDir, 'script.js'),
      output: path.join(baseDir, 'script.min.js'),
      type: 'js'
    },
    {
      input: path.join(baseDir, 'ai-config.js'),
      output: path.join(baseDir, 'ai-config.min.js'),
      type: 'js'
    }
  ];
  
  let successCount = 0;
  let totalOriginalSize = 0;
  let totalMinifiedSize = 0;
  
  for (const file of files) {
    if (!fs.existsSync(file.input)) {
      log(colors.yellow, `⚠ File not found: ${file.input}`);
      continue;
    }
    
    const originalSize = fs.statSync(file.input).size;
    
    let success = false;
    if (file.type === 'css') {
      success = minifyCSS(file.input, file.output);
    } else if (file.type === 'js') {
      success = minifyJS(file.input, file.output);
    }
    
    if (success) {
      successCount++;
      const minifiedSize = fs.statSync(file.output).size;
      const gzipSize = getGzipSize(file.output);
      
      totalOriginalSize += originalSize;
      totalMinifiedSize += minifiedSize;
      
      if (gzipSize) {
        log(colors.green, `  Gzipped: ${gzipSize} bytes`);
      }
    }
  }
  
  // Summary
  log(colors.blue, '\n📊 Summary');
  log(colors.blue, '================================');
  log(colors.green, `✓ Successfully minified: ${successCount}/${files.length} files`);
  log(colors.green, `Total size reduction: ${totalOriginalSize} → ${totalMinifiedSize} bytes`);
  
  const totalReduction = ((totalOriginalSize - totalMinifiedSize) / totalOriginalSize * 100).toFixed(2);
  log(colors.green, `Overall reduction: -${totalReduction}%\n`);
}

main().catch(err => {
  log(colors.red, `Fatal error: ${err.message}`);
  process.exit(1);
});
