document.addEventListener("DOMContentLoaded", function() {
    const color1Input = document.getElementById("color1");
    const color2Input = document.getElementById("color2");
    const mixedColorName = document.getElementById("mixed-color-name");
    const mixedColorPreview = document.getElementById("mixed-color-preview");
  
    color1Input.addEventListener("input", updateMixedColor);
    color2Input.addEventListener("input", updateMixedColor);
  
    function updateMixedColor() {
      const color1 = color1Input.value;
      const color2 = color2Input.value;
  
      // Exibe a cor misturada
      mixedColorPreview.style.display = "block";
      
      // Atualiza a cor de fundo da div com a cor misturada
      mixedColorPreview.style.backgroundColor = mixColors(color1, color2);
  
      // Obtém o nome da cor misturada da API
      getColorName(color1, color2)
        .then(name => {
          mixedColorName.textContent = name;
        })
        .catch(error => {
          console.error('Erro ao obter nome da cor misturada:', error);
          mixedColorName.textContent = "Desconhecido";
        });
    }
  
    function mixColors(color1, color2) {
      const r1 = parseInt(color1.substring(1, 3), 16);
      const g1 = parseInt(color1.substring(3, 5), 16);
      const b1 = parseInt(color1.substring(5, 7), 16);
  
      const r2 = parseInt(color2.substring(1, 3), 16);
      const g2 = parseInt(color2.substring(3, 5), 16);
      const b2 = parseInt(color2.substring(5, 7), 16);
  
      const mixedR = Math.floor((r1 + r2) / 2);
      const mixedG = Math.floor((g1 + g2) / 2);
      const mixedB = Math.floor((b1 + b2) / 2);
  
      return rgbToHex(mixedR, mixedG, mixedB);
    }
  
    function rgbToHex(r, g, b) {
      const hex = (r << 16) | (g << 8) | b;
      return "#" + (0x1000000 + hex).toString(16).slice(1);
    }
  
    function getColorName(color1, color2) {
      const url = `https://www.thecolorapi.com/id?hex=${mixColors(color1, color2).substring(1)}`;
  
      return fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.name && data.name.value) {
            return data.name.value;
          } else {
            return "Desconhecido";
          }
        })
        .catch(error => {
          console.error('Erro ao obter informações da cor:', error);
          return "Desconhecido";
        });
    }
  });
  