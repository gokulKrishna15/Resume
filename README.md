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
node generate_resume.js
```

Output: `out/Resume_Gokul_Krishna.docx`

Notes:
- The script writes to an `out` directory next to the script file.
- If you want the file saved elsewhere, edit `generate_resume.js` and change the `outDir` path.

