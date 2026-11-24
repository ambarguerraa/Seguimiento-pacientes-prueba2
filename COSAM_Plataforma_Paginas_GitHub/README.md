# COSAM | Plataforma de monitoreo y seguimiento clínico

**Maqueta estática y navegable** basada en el video de recorrido y el PDF `Certamen02labWEB.pdf` suministrados. Se conserva el estilo de La Reina: portada con aurora azul, verde-agua y violeta, turquesa, textos blancos/crema; interior con fondo gris claro, menú turquesa y paneles lavanda.

## Pantallas

1. `index.html`: Portada animada, botón INGRESAR.
2. `login.html`: Acceso visual: Bienvenido/a, correo institucional, contraseña, Recordarme, ¿Olvidaste tu contraseña?, REGISTRARSE.
3. `panel.html`: Panel general: 128, 07, 04, 03 y alertas recientes.
4. `pacientes.html`: Tarjetas de pacientes, búsqueda y filtros funcionales para los dos registros ilustrativos.
5. `ficha.html?id=P-024`: Ficha del paciente, resumen, pestañas Evolución y Alertas; detalle de dispositivos.
6. `alertas.html`: Alertas, indicadores, ver detalles y botón Gestionar demostrativo.
7. `seguimiento.html` e `informes.html`: Opciones en el menú; **sin pantalla de referencia detallada**, por lo que se dejaron como espacios pendientes, sin inventar datos.

## CÓMO USAR EN GITHUB PAGES (SIN NODE NI INSTALACIONES)

1. Crea un repositorio en GitHub, por ejemplo `cosam-prototipo`.
2. Extrae el ZIP.
3. Sube **todos los archivos y la carpeta `assets`** a la raíz del repositorio (no subas el ZIP).
4. En GitHub ve a **Settings > Pages**.
5. En **Build and deployment** selecciona **Deploy from a branch**, rama **main**, carpeta **/(root)**. Guarda.
6. GitHub publicará `https://TU-USUARIO.github.io/cosam-prototipo/`.

También puedes abrir `index.html` localmente en Chrome para navegar por las pantallas.

## CÓMO CAMBIAR LAS PALABRAS

Abre `textos.js` desde GitHub y pulsa el lápiz de edición. Allí están los títulos principales, subtítulos y botones. Cambia únicamente el texto entre comillas, sin quitar las comillas, comas ni nombres de propiedades. Haz **Commit changes** para actualizar GitHub Pages. Otros textos y datos de ejemplo están en `app.js`.

## COLORES

En `styles.css`, las primeras líneas contienen las variables para los colores originales. Evita cambiarlas si quieres conservar la maqueta.

- `--turquesa`: cabecera y botones.
- `--menu`: barra lateral.
- `--morado`: títulos internos.
- `--lavanda`: indicadores.
- `--fondo`: gris claro.

En `assets/` encontrarás el logo, el video de 12 segundos, su fotograma de respaldo y la imagen del acceso. No se requieren recursos multimedia externos para que la maqueta funcione.

## IMPORTANTE: PROTOTIPO, NO SISTEMA CLÍNICO

- **No hay backend ni verificación de credenciales.** El formulario solo enlaza al panel de muestra; cualquier información escrita se descarta. No ingresar contraseñas reales.
- **No se guardan, envían ni gestionan datos de pacientes.** Los conteos, alertas y estados son ilustrativos. Los datos identificables del PDF (nombre completo y RUT) se reemplazaron por marcadores de ejemplo para no exponerlos en un repositorio público.
- Las acciones `GESTIONAR`, `Ver datos recolectados` y el perfil muestran una simulación, no realizan intervenciones clínicas.
- No es apto para uso clínico ni para publicar información real de salud. Para un sistema real se requiere autenticación institucional, control de roles, registro de auditoría, almacenamiento seguro, legislación de protección de datos y validación profesional.

## Organización

```
index.html
login.html
panel.html
pacientes.html
ficha.html
alertas.html
seguimiento.html
informes.html
textos.js      # Personalizar títulos y palabras
app.js         # Navegación e interacción visual
styles.css     # Estilos de todas las páginas
assets/
    aurora.mp4
    aurora-poster.jpg
    imagen-acceso.webp
    logo-la-reina.png
```

No hay pasos `npm`, compilación, dependencias de React, API ni base de datos. El navegador sirve archivos estáticos directamente. Las tipografías tienen alternativas locales en caso de no cargar Google Fonts.
