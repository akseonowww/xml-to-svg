// Libs
function updateIcon(icon, w, h) {
   document.getElementById("iconInner").innerHTML =
      icon + `<small>${w}x${h}</small>`;
}

// =====================================================================

// Convert to SVG
const convertXmlToSvg = () => {
   const xmlInput = document.getElementById("inputXml").value.toString();

   if (xmlInput === "") {
      return console.log("No code XML");
   }

   let widthSvg, heightSvg, widthSvgX, heightSvgX

   if (xmlInput.match(/android:width="([^"]+).0dip"/)) {
      widthSvg = xmlInput.match(/android:width="([^"]+).0dip"/)[1];
   } 
   if (xmlInput.match(/android:height="([^"]+).0dip"/)) {
      heightSvg = xmlInput.match(/android:height="([^"]+).0dip"/)[1];
   }

   if (xmlInput.match(/android:viewportWidth="([^"]+).0"/)) {
      widthSvgX = xmlInput.match(/android:viewportWidth="([^"]+).0"/)[1];
   } 
   if (xmlInput.match(/android:viewportHeight="([^"]+).0"/)) {
      heightSvgX = xmlInput.match(/android:viewportHeight="([^"]+).0"/)[1];
   }

   let sizeOutput = ""
   if (widthSvg) {
      sizeOutput = `width="${widthSvg}"`
   } 
   if (heightSvg) {
      sizeOutput += ` height="${heightSvg}"`
   }
   
   let viewOutputX = ""
   if (widthSvgX) {
      viewOutputX = `viewBox="0 0 ${widthSvgX}`
   } 
   if (heightSvgX) {
      viewOutputX += ` ${heightSvg}`
   }
   if (viewOutputX !== "") {
      viewOutputX += '"'
   }

   console.log("xmlInput", xmlInput);
   let result = xmlInput
      // Теги
      .replaceAll(
         `<?xml version="1.0" encoding="utf-8"?>`,
         ""
      )
      .replace(
         /<vector [^>]*>/,
         `<svg ${sizeOutput} ${viewOutputX} xmlns="http://www.w3.org/2000/svg">`
      )
      .replace(/<\/vector>/, "</svg>")
      .replaceAll("<group", "<g")
      .replaceAll("</group", "</g")
      .replaceAll("<clip-path", "<clipPath")
      .replaceAll("</clip-path", "</clipPath")
      .replace(/>(\s*?)</g, ">\n<")
      // Атрибуты
      .replaceAll("android:fillColor", "fill")
      .replaceAll("android:pathData", "d")
      .replaceAll("android:strokeWidth", "stroke-width")
      .replaceAll("android:strokeColor", "stroke")
      .replaceAll("android:strokeAlpha", "stroke-opacity")
      .replaceAll("android:fillAlpha", "fill-opacity")
      .replaceAll("android:fillType", "filltype")
      .replaceAll("android:name", "name")
      .replaceAll("android:pivotX", "px")
      .replaceAll("android:pivotY", "py")
      .replaceAll("android:rotation", "rotation")
      .replaceAll("android:strokeLineCap", "rotation")
      // Свойства
      .replaceAll("evenOdd", "evenodd")
      .replaceAll(/#([0-9A-Fa-f]{8})/g, (match, p1) => {
         return "#" + p1.substring(2);
      })
      .trim();

{/* <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
<g android:name="spinner" android:pivotX="9.0" android:pivotY="9.0">
<path fill="#000000" d="M17,9C17,13.4183 13.4183,17 9,17C4.5817,17 1,13.4183 1,9C1,4.5817 4.5817,1 9,1" strokeColor="#000000" strokeWidth="2.0" strokeLineCap="round" />
</g>
</svg> */}

   // console.log('xmlDoc', xmlDoc);
   // console.log('\nxmlInput');
   // console.log(result);
   // console.log('\nresult');
   // console.log(result);

   console.log("ckick");

   const svgOutput = result;
   document.getElementById("outputSvg").value = svgOutput;
   updateIcon(svgOutput, "0" || widthSvg, "0" || heightSvg);
};
document.getElementById("btnConvet").addEventListener("click", convertXmlToSvg);

// Reverse
document.getElementById("btnRevers").addEventListener("click", () => {
   console.log("this");
});

// =====================================================================

// Download XML
function downloadIconXML() {
   if (document.getElementById("inputXml").value.toString() === "") {
      return console.log("No code XML");
   }
   const xml = document.querySelector("#inputXml").value; // Предполагая, что вы извлекаете XML
   const blob = new Blob([xml], { type: "application/xml;charset=utf-8" });
   const url = URL.createObjectURL(blob);
   const x = document.getElementById("nameFile").value
   let fileName = "akseonowww";
   if (x !== "") {
      fileName = document.getElementById("nameFile").value;
   }
   
   const a = document.createElement("a");
   a.href = url;
   a.download = fileName + ".xml"; // Измените имя файла на нужное
   document.body.appendChild(a);
   a.click();
   
   // Cleanup
   setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
   }, 0);
}
document.getElementById("btnDownXML").addEventListener("click", function () {
   downloadIconXML()
});

// Download SVG
function downloadIconSVG() {
   if (document.getElementById("outputSvg").value.toString() === "") {
      return console.log("No code SVG");
   }
   const svg = document.querySelector("#iconInner svg").outerHTML;
   const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
   const url = URL.createObjectURL(blob);
   const x = document.getElementById("nameFile").value
   let fileName = "akseonowww";
   if (x !== "") {
      fileName = document.getElementById("nameFile").value;
   }
   
   const a = document.createElement("a");
   a.href = url;
   a.download = fileName + ".svg";
   document.body.appendChild(a);
   a.click();
   
   // Cleanup
   setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
   }, 0);
}
document.getElementById("btnDownSVG").addEventListener("click", function () {
   downloadIconSVG()   
});

// =====================================================================

// Download SVG (Icon)
document.getElementById("iconInner").addEventListener("click", function () {
   if (document.getElementById("outputSvg").value.toString() === "") {
      return console.log("No code SVG");
   }

   const svg = document.querySelector("#iconInner svg").outerHTML;
   const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
   const url = URL.createObjectURL(blob);

   const a = document.createElement("a");
   a.href = url;
   a.download = "akseonowww.svg";
   document.body.appendChild(a);
   a.click();

   // Cleanup
   setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
   }, 0);
})