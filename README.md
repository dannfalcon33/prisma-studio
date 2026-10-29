# Prisma Studio — Conversor de Imágenes Multiformato

**Prisma Studio** es una aplicación web con estética **Cyberpunk (Negro Obsidiana y Morado Neón)** diseñada para convertir, optimizar, redimensionar e inspeccionar lotes de hasta **5 imágenes simultáneas** directamente en el navegador del usuario (100% *client-side*), sin necesidad de subir archivos a servidores externos.

---

## 1. Definición de la Aplicación

Prisma Studio resuelve la necesidad de transformar activos gráficos entre formatos web modernos, formatos de edición/imprenta sin pérdida y formatos de iconografía/vectoriales desde una interfaz unificada. La aplicación está dividida en dos vistas principales gestionadas mediante **React Router DOM**:

- **Página Principal (`/`)**: Landing page informativa e interactiva donde se presenta la arquitectura de procesamiento óptico, métricas reales de reducción de peso, y el catálogo técnico de los 10 formatos soportados con acceso rápido al estudio conversor.
- **Estudio de Conversión (`/convertir`)**: Espacio de trabajo dedicado a la carga por lotes (máximo 5 imágenes simultáneas), configuración de parámetros ópticos, conversión individual o masiva, comparación visual antes/después y exportación individual o en paquete `.zip`.

---

## 2. Formatos Soportados y Motores de Codificación

Prisma Studio soporta **10 formatos de imagen** organizados en tres categorías técnicas:

| Formato | Extensión | MIME Type | Categoría | Transparencia | Compresión Regulable | Motor de Codificación |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **WEBP** | `.webp` | `image/webp` | Web & Estándar | Sí (Canal Alfa) | Sí (10% – 100%) | Codificador nativo HTML5 Canvas WebP |
| **PNG** | `.png` | `image/png` | Web & Estándar | Sí (RGBA 32-bit) | Sin pérdida (Lossless) | Codificador nativo HTML5 Canvas PNG |
| **JPG** | `.jpg` | `image/jpeg` | Web & Estándar | No (Relleno configurable) | Sí (10% – 100%) | Codificador cromático JPEG con mate de fondo |
| **JPEG** | `.jpeg` | `image/jpeg` | Web & Estándar | No (Relleno configurable) | Sí (10% – 100%) | Codificador cromático JPEG con extensión `.jpeg` |
| **AVIF** | `.avif` | `image/avif` | Web & Estándar | Sí (Canal Alfa) | Sí (10% – 100%) | Codificador nativo AV1 con fallback de alta eficiencia |
| **BMP** | `.bmp` | `image/bmp` | Edición & Archivo | No | Sin pérdida (24-bit) | Empaquetador binario directo (`BITMAPFILEHEADER` + `BITMAPINFOHEADER`) |
| **TIFF** | `.tiff` | `image/tiff` | Edición & Archivo | No | Sin pérdida (RGB) | Empaquetador binario **Baseline TIFF 6.0** (Little-Endian `II` + IFD tags) |
| **GIF** | `.gif` | `image/gif` | Iconografía & Vector | No | Paleta indexada (256 col) | Codificador binario **GIF89a** con cuantización cúbica RGB y compresión **LZW** |
| **ICO** | `.ico` | `image/x-icon` | Iconografía & Vector | Sí (Canal Alfa) | Sin pérdida (32–256 px) | Contenedor binario Windows Icon (`ICONDIR` + `ICONDIRENTRY` + payload PNG) |
| **SVG** | `.svg` | `image/svg+xml` | Iconografía & Vector | Sí (Canal Alfa) | Sí (10% – 100%) | Generador XML `SVG 1.1` con `viewBox` escalable de precisión |

---

## 3. Funcionamiento Detallado del Flujo de Conversión

### Paso 1: Carga y Validación del Lote (Máximo 5 Imágenes)
1. El usuario puede arrastrar y soltar archivos en la zona de carga (*Drag & Drop*), seleccionarlos desde el explorador de archivos o pulsar el botón **«Cargar 3 imágenes de prueba»** (que genera dinámicamente 3 imágenes de alta resolución en memoria para pruebas inmediatas).
2. El sistema verifica el límite estricto de **5 ranuras por lote** (`0 / 5` a `5 / 5`). Si el usuario selecciona más archivos de los permitidos, la cola admite hasta completar las 5 ranuras y muestra un aviso informativo.
3. Cada imagen se decodifica localmente para extraer sus dimensiones originales en píxeles (`ancho × alto px`), formato de origen y tamaño exacto en bytes.

### Paso 2: Selección de Formato (Global o Individual)
- **Selector Global**: En la barra superior del estudio conversor se puede elegir cualquiera de los 10 formatos (`WEBP`, `PNG`, `JPG`, `JPEG`, `AVIF`, `BMP`, `TIFF`, `GIF`, `ICO`, `SVG`) para aplicarlo automáticamente a todas las imágenes cargadas. Also acepta preselección por URL (ej. `/convertir?formato=png`).
- **Selector Individual por Fila**: Cada una de las 5 imágenes en la cola cuenta con su propio menú desplegable para asignarle un formato de salida diferente dentro del mismo lote.

### Paso 3: Ajuste de Parámetros Ópticos y Geométricos
Al desplegar el panel **«Parámetros ópticos»**, el usuario puede personalizar la transformación antes de codificar:
- **Calidad de codificación (`10%` a `100%`)**: Regula el factor de compresión en formatos con pérdida o híbridos (`WEBP`, `JPG`, `JPEG`, `AVIF`, `SVG`).
- **Escala de resolución (`25%`, `50%`, `75%`, `100%`, `150%`, `200%`)**: Redimensiona proporcionalmente el ancho y alto de salida con interpolación bicúbica de alta calidad (`imageSmoothingQuality = 'high'`).
- **Geometría**: Rotación en pasos de `90°` (`0°`, `90°`, `180°`, `270°`) y volteo horizontal o vertical.
- **Filtros de color a nivel de píxel**: Color original, Blanco y negro (luminancia ITU-R BT.601), Sepia editorial, Alto contraste e Inversión de canales.
- **Relleno de fondo sin canal alfa y tamaño ICO**: Define el color de fondo (`Obsidiana #0F172A`, `Blanco #FFFFFF` o `Violeta #3B0764`) cuando se convierte una imagen con transparencia hacia un formato opaco (`JPG`, `JPEG`, `BMP`, `TIFF`), y permite elegir la dimensión exacta de salida para iconos `.ico` (`256px`, `128px`, `64px`, `32px`).

### Paso 4: Inspección Óptica Antes / Después
Una vez convertida cualquier imagen, el botón **«Comparar»** abre el modal de inspección óptica con dos modos de verificación:
- **Cortina interactiva**: Superpone la imagen original y la convertida con un control deslizante vertical para inspeccionar detalles, bordes y compresión al 100%.
- **Vista lado a lado**: Muestra ambos archivos en paralelo junto con sus dimensiones, formato MIME, tiempo de codificación en milisegundos (`ms`) y porcentaje exacto de ahorro en peso.

### Paso 5: Descarga Individual o por Lotes en ZIP
- Cada fila dispone de su botón **«Descargar»** con el nombre original y la nueva extensión correspondiente.
- Cuando hay 2 o más imágenes convertidas, se habilita el botón **«Descargar lote en ZIP»**, que empaqueta en memoria todos los archivos convertidos mediante `JSZip` en un único archivo comprimido `prisma_studio_lote_N_imagenes.zip`.

---

## 4. Estructura del Proyecto

```text
/
├── public/
│   └── favicon.svg                  # Favicon vectorial con prisma óptico neón
├── index.html                       # Metadatos SEO, OpenGraph, Twitter Cards y JSON-LD
├── metadata.json                    # Configuración y descripción de la aplicación
├── README.md                        # Documentación técnica y funcional detallada
└── src/
    ├── App.tsx                      # Configuración de rutas con React Router DOM
    ├── index.css                    # Tema Cyberpunk (negro obsidiana + morado neón)
    ├── main.tsx                     # Punto de entrada de React 19
    ├── components/
    │   ├── Navbar.tsx               # Barra de navegación superior de 3 zonas
    │   └── ImageCompareModal.tsx    # Inspector comparativo con cortina deslizante
    ├── pages/
    │   ├── LandingPage.tsx          # Página principal (Ruta "/")
    │   └── ConverterPage.tsx        # Estudio de conversión de hasta 5 imágenes (Ruta "/convertir")
    └── utils/
        └── imageConverter.ts        # Motores de codificación binaria y filtros ópticos
```
