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

CI automation:
- A GitHub Action (`.github/workflows/generate-resume.yml`) will run on pushes to `main`. It installs LibreOffice, runs the generator, and commits the generated `out/Resume_Gokul_Krishna.pdf` and `.docx` to a branch named `generated`.
- You can fetch or view the `generated` branch to get the latest PDF automatically created by CI.

Quick run (Windows PowerShell)
1. From the project folder, install the dependency:

```powershell
npm install
```

2. Run the generator (CommonJS):

```powershell
node generate_resume.cjs
```

3. Show the `out` folder and open the generated file (if present):

```powershell
Get-ChildItem out
Start-Process .\out\Resume_Gokul_Krishna.docx
# or open the PDF if generated locally:
Start-Process .\out\Resume_Gokul_Krishna.pdf
```

Quick run (Linux / macOS)
```bash
npm install
node generate_resume.cjs
ls -la out
xdg-open out/Resume_Gokul_Krishna.pdf || open out/Resume_Gokul_Krishna.docx
```

If PDF conversion fails locally
- Install LibreOffice (soffice) and re-run the conversion command:

```bash
soffice --headless --convert-to pdf --outdir out out/Resume_Gokul_Krishna.docx
```

Get the CI-generated PDF
- The GitHub Action creates/updates a `generated` branch containing the generated PDF and DOCX. To fetch that branch locally:

```bash
git fetch origin generated
git checkout generated
ls -la out
```

Notes
- The generator writes to the `out/` directory next to the script file. Edit `generate_resume.cjs` to change filenames or output paths.
- The repository now includes `generate_resume.cjs`, `README.md`, and the CI workflow; old site files and the photo have been removed.

