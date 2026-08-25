# Resume

Resume generator

Files:
- generate_resume.js — Node script that generates Resume_Gokul_Krishna.docx into the `out/` folder using the `docx` package.

Run:
1. Install dependencies:

```bash
npm install docx
```

2. Run the generator:

```bash
# If your environment treats .js files as ES modules, run the CommonJS file instead:
node generate_resume.cjs

# or, if you prefer the .js file and your environment supports CommonJS, run:
node generate_resume.js
```

Output: `out/Resume_Gokul_Krishna.docx`

PDF export:
- The generator will attempt to convert the DOCX to PDF automatically using LibreOffice (`soffice`).
- Make sure LibreOffice is installed and `soffice` is available on your PATH. The script runs:

```bash
soffice --headless --convert-to pdf --outdir out out/Resume_Gokul_Krishna.docx
```

Notes:
- The script writes to an `out` directory next to the script file.
- If you want the file saved elsewhere, edit `generate_resume.cjs` and change the `outDir` path.

