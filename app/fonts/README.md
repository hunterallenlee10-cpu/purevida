Fraunces (SIL Open Font License 1.1), from Google Fonts, latin subset, optical size 144:
- `Fraunces144-Variable.woff2`: upright, weight axis 400 to 600.
- `Fraunces144-400-Italic.woff2`: italic 400.

Self-hosted through `next/font/local` because the full variable family (all optical sizes, both styles) is about 149 KB,
while these two files are about 55 KB. Hanken Grotesk still loads through `next/font/google`.
