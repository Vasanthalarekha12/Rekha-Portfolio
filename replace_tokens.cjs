const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.jsx')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = walkSync(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content
    .replace(/var\(--text-main\)/g, 'var(--color-text-primary)')
    .replace(/var\(--text-muted\)/g, 'var(--color-text-muted)')
    .replace(/var\(--bg-main\)/g, 'var(--color-bg)')
    .replace(/var\(--bg-surface\)/g, 'var(--color-surface)')
    .replace(/bg-\[#08080D\]/g, 'bg-[var(--color-bg)]')
    .replace(/text-orange-500/g, 'text-[var(--color-accent)]')
    .replace(/bg-orange-500/g, 'bg-[var(--color-accent)]')
    .replace(/#FF7A00/g, 'var(--color-accent)');
  fs.writeFileSync(file, content, 'utf8');
});

console.log('Done replacing tokens');
