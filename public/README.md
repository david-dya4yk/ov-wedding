# Медіа-файли

Усі ассети на місці.

| Файл                             | Джерело                                     | Розмір |
| -------------------------------- | ------------------------------------------- | ------ |
| `images/hero.jpg`                | «Фото 161 (2).jpg», стиснуто до 2000px      | ~1 МБ  |
| `images/venue.jpg`               | `IMG_0736.JPG`, стиснуто до 2000px          | 141 КБ |
| `images/ornament.svg`            | `4789.svg` — квіткова рамка навколо тексту  | 3.6 КБ |
| `video/intro.mp4`                | вступне відео на титульному оверлеї         | 5.9 МБ |
| `fonts/Blosta-Script.otf`        | рукописний шрифт для «Oleh & Victoria»      | 68 КБ  |

Фонові фото підключені через CSS `background-image` у
`src/components/Hero/Hero.module.css` і `src/components/Venue/Venue.module.css`.
Рамка — у `src/components/Invitation/Invitation.module.css`.
Шрифт підключений через `next/font/local` у `src/app/layout.tsx`.

## Що можна покращити

- **Відео 5.9 МБ** — найважчий ассет на сторінці. Воно вантажиться з `preload="metadata"`,
  тож саму сторінку не блокує, але для мобільного інтернету варто перекодувати
  (наприклад `ffmpeg -i intro.mp4 -vf scale=-2:720 -crf 30 -c:a copy intro-720.mp4`).
- **Шрифт `.otf`** можна стиснути у `.woff2` (~2× менше) через `fonttools`:
  `pip install fonttools brotli && pyftsubset Blosta-Script.otf --flavor=woff2 --output-file=blosta.woff2`.
  Потім змінити `src` у `layout.tsx`.
