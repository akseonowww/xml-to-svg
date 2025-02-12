console.log('0');
const convertXmlToSvg = () => {
  const xmlInput = document.getElementById('inputXml').value.toString();
  let widthSvg = xmlInput.match(/android:viewportWidth="([^"]+).0"/)[1];
  let heightSvg = xmlInput.match(/android:viewportHeight="([^"]+).0"/)[1];

  // const parser = new DOMParser();
  // const xmlDoc = parser.parseFromString(xmlInput, 'text/xml');

  const inputString = '#ABCD1234';
  const modifiedString = inputString.replace(
    /#([0-9A-Fa-f]{8})/g,
    (match, p1) => {
      return '#' + p1.substring(2); // Берем строку с третьего символа
    }
  );

  // console.log(modifiedString); // Вывод: '#CD1234'

  console.log('xmlInput', xmlInput);
  let result = xmlInput
    .replaceAll(
      `<?xml version="1.0" encoding="utf-8"?>`,
      ''.replaceAll('evenOdd', 'evenodd')
    )
    .replaceAll('android:fillColor', 'fill')
    .replaceAll(/#([0-9A-Fa-f]{8})/g, (match, p1) => {
      return '#' + p1.substring(2);
    })
    .replace(/>(\s*?)</g, '>\n<')
    .replaceAll('android:pathData', 'd')
    .replaceAll('android:strokeAlpha', 'stroke-opacity')
    .replaceAll('android:fillAlpha', 'fill-opacity')
    .replaceAll('android:fillType', 'filltype')
    .replaceAll('evenOdd', 'evenodd')
    .replace(
      /<vector [^>]*>/,
      `<svg width="${widthSvg}" height="${heightSvg}" xmlns="http://www.w3.org/2000/svg">`
    )
    .replace(/<\/vector>/, '</svg>')
    .trim();

  // console.log('xmlDoc', xmlDoc);
  // console.log('\nxmlInput');
  // console.log(result);
  // console.log('\nresult');
  // console.log(result);

  console.log('ckick');
  
  const svgOutput = result;
  document.getElementById('outputSvg').value = svgOutput;
  document.getElementById('iconInner').innerHTML =
  svgOutput + `<small>${widthSvg}x${heightSvg}</small>`;
};

console.log('1');
document
.getElementById('btnConvet')
.addEventListener('click', convertXmlToSvg());
console.log('2');
