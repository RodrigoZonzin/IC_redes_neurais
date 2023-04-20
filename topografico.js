var image = ee.Image("USGS/SRTMGL1_003"),
    imageVisParam = {"opacity":1,"bands":["elevation"],"min":726,"max":1248,"palette":[]};
    
var ba = ee.FeatureCollection("users/rodrigozonzin/BA_Municipios_2021"),
 pa = ee.FeatureCollection("users/rodrigozonzin/PA_Municipios_2021"),
 ma = ee.FeatureCollection("users/rodrigozonzin/MA_Municipios_2021"),
 rj = ee.FeatureCollection("users/rodrigozonzin/RJ_Municipios_2021"),
 rn = ee.FeatureCollection("users/rodrigozonzin/RN_Municipios_2021"),
 go = ee.FeatureCollection("users/rodrigozonzin/GO_Municipios_2021"),
 to = ee.FeatureCollection("users/rodrigozonzin/TO_Municipios_2021");
 
 /* VARIAVEIS PELA NOVA ABORDAGEM POR SETOR CENCITARIO*/
 var parauapebas = ee.FeatureCollection("users/rodrigozonzin/Parauapebas_limitesPorSetorCensitario"),
     lauroDeFreitas = ee.FeatureCollection("users/rodrigozonzin/lauroDeFreitas_limitesPorSetorCensitario"),
     macae = ee.FeatureCollection("users/rodrigozonzin/macae_limitesPorSetorCensitario"),
     marica = ee.FeatureCollection("users/rodrigozonzin/marica_limitesPorSetorCensitario"),
     palmas = ee.FeatureCollection("users/rodrigozonzin/palmas_limitesPorSetorCensitario"),
     parnamirim = ee.FeatureCollection("users/rodrigozonzin/parnamirim_limitesPorSetorCensitario"),
     rioDasOstras = ee.FeatureCollection("users/rodrigozonzin/rioDasOstras_limitesPorSetorCensitario"),
     rioVerde = ee.FeatureCollection("users/rodrigozonzin/rioVerde_limitesPorSetorCensitario"),
     saoJoseDeRibamar = ee.FeatureCollection("users/rodrigozonzin/saoJoseDeRibamar_limitesPorSetorCensitario"),
     barcarena = ee.FeatureCollection("users/rodrigozonzin/barcarena_limitesPorSetorCensitario");

/* VARIAVEIS ABORDAGEM DE MARIO PUJATTI */
var bq_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/barbacena_pujatti"),
    lauro_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/lauroDeFreitas_pujatti"),
    macae_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/macae_pujatti"),
    palmas_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/palmas_pujjatti"),
    parnamirim_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/parnamirim_pujatti"),
    marica_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/marica_pujatti"), 
    rioDasOstras_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/riodasostras_puj"), 
    rioVerde_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/rioVerde_puj"), 
    saoJoseRibamar_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/saoJoseDeRibamar_puj");


function main(){

  var cidades = [parauapebas], //, lauro_puj, macae_puj, palmas_puj, parnamirim_puj, marica_puj, rioDasOstras_puj, rioVerde_puj, saoJoseRibamar_puj],
  nomeCidades = ["parauapebas"]; //, "lauroDeFreitas", "macae", "palmas", "parnamirim", "marica", "rioDasOstras", "rioVerde", "saoJoseDeRibamar"]; 

  var img; 
  
  for(var i = 0; i<cidades.length; i++){
    img = image.clip(cidades[i]); 
    exportImage(img, cidades[i], nomeCidades[i]); 
  }
  Map.addLayer(img, imageVisParam);
}






var palettes = require('users/gena/packages:palettes'),
  palette = palettes.kovesi.linear_kry_5_95_c72[7].reverse();

var imageVisParam = {
  "opacity":1,
  "bands":["elevation"],
  "min":726,
  "max":1248,
  "palette": palette, //['006633', 'EFFFCC', '662A00', 'D8D8D8', 'F5F5F5']
};


function exportImage(img, roi, nomeCidade){
  Export.image.toDrive({
      image: img, 
      description: nomeCidade+"_elevacao", 
      folder: "elevacao_"+nomeCidade, 
      region: roi, 
      scale: 30,
      crs: "EPSG:4326"
  }); 
}



main(); 



