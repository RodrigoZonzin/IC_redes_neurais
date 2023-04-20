var parauapebas = ee.FeatureCollection("users/rodrigozonzin/Parauapebas_limitesPorSetorCensitario"),
    lauroDeFreitas = ee.FeatureCollection("users/rodrigozonzin/lauroDeFreitas_limitesPorSetorCensitario"),
    macae = ee.FeatureCollection("users/rodrigozonzin/macae_limitesPorSetorCensitario"),
    marica = ee.FeatureCollection("users/rodrigozonzin/marica_limitesPorSetorCensitario"),
    palmas = ee.FeatureCollection("users/rodrigozonzin/palmas_limitesPorSetorCensitario"),
    parnamirim = ee.FeatureCollection("users/rodrigozonzin/parnamirim_limitesPorSetorCensitario"),
    rioDasOstras = ee.FeatureCollection("users/rodrigozonzin/rioDasOstras_limitesPorSetorCensitario"),
    rioVerde = ee.FeatureCollection("users/rodrigozonzin/rioVerde_limitesPorSetorCensitario"),
    saoJoseDeRibamar = ee.FeatureCollection("users/rodrigozonzin/saoJoseDeRibamar_limitesPorSetorCensitario");


var batch = require('users/fitoprincipe/geetools:batch');

function main(){
  /*  ABORDAGEM SETORES
  var cidades = [parauapebas, lauroDeFreitas, macae, marica, palmas,
             parnamirim, rioDasOstras,rioVerde, saoJoseDeRibamar];
             
  var nomeCidades = ["Parauapebas", "lauroDeFreitas", "macae","marica",
                 "palmas", "parnamirim", "rioDasOstras", "rioVerde",
                 "saoJoseDeRibamar"]; 
  */ 
  
  /* ABORDAGEM MARIO */
  var bq_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/barcarena_pujatti"),
    lauro_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/lauroDeFreitas_pujatti"),
    macae_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/macae_pujatti"),
    palmas_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/palmas_pujjatti"),
    parnamirim_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/parnamirim_pujatti");
  
  
  
  var cidades =[bq_puj , lauro_puj, macae_puj, palmas_puj, parnamirim_puj];
  var nomeCidades =["barbacena", "lauroDeFreitas", "macae", "palmas", "parnamirim"]; 
  for(var i=0; i<cidades.length; i++){
    generateAndExportData(cidades[i], nomeCidades[i]); 
  }
  
  //Map.addLayer(ee.Image(imgCollec.toList(35).get(16)), {palette: MBpalette}, "ROI1985");
  //Map.addLayer(ee.Image(imgCollec.toList(35).get(17)), {palette: MBpalette}, "ROI2020");
}


var MBpalette = [
  '006400', // forest
  '45C2A5', // nonForest
  'FFFFB2', // farming
  'EA9999', // non vegetable area
  'aa0000', // urban
  '0000FF', // water
];


var fromList = [1, 3, 4, 5, 49, 10, 11, 12, 32, 29, 13, 14, 15, 18, 19, 39, 20, 40, 41, 36, 46, 47, 48, 9, 21, 22, 23, 30, 25, 24, 26, 33, 31];
var toList =  [1, 1, 1, 1,  1,  2,  2,  2,  2,  2,  2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3, 3,  3,  4,  4,  4,  4,  5,  6,  6,  6];


function exportImgCollection(imgCollection, roi, nomeArquivo, nomePasta, n){
  var listImgCollection = imgCollection.toList(imgCollection.size());  
  
  for(var i = 0; i<n; i++){
    //Export.image.toDrive(image, description, folder, fileNamePrefix, dimensions, region, scale, crs, crsTransform, 
    //maxPixels, shardSize, fileDimensions, skipEmptyTiles, fileFormat, formatOptions)
    Export.image.toDrive({
      image: ee.Image(imgCollection.toList(n).get(i)), 
      description: nomeArquivo+"_"+(1985+i)+"_puj",
      folder: nomePasta, 
      region: roi, 
      scale: 30,
      crs: "EPSG:4326"
  }); 
  }
}


function selectImgFromMB(index, roi){
  //var index = year - 1985; 
  var mapbiomas = ee.Image("projects/mapbiomas-workspace/public/collection6/mapbiomas_collection60_integration_v1")
                  .clip(roi.geometry());
  return ee.Image(mapbiomas.select(index)); 
}

function generateImgCollection(roi, begin, end){
  var beginIndex = begin-1985, endIndex = end-1985; 
  var n = endIndex - beginIndex; 
  var imgCollection = new Array(n);  
  
  for(var i=beginIndex, j=0; i<endIndex;i++, j++){
    imgCollection[j] = selectImgFromMB(i, roi); 
  }
 return ee.ImageCollection.fromImages(imgCollection);  
}


function generateSuperClass(img){
  var fromList = [1, 3, 4, 5, 49, 10, 11, 12, 32, 29, 13, 14, 15, 18, 19, 39, 20, 40, 41, 36, 46, 47, 48, 9, 21, 22, 23, 30, 25, 24, 26, 33, 31],
      toList =  [1, 1, 1, 1,  1,  2,  2,  2,  2,  2,  2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3, 3,  3,  4,  4,  4,  4,  5,  6,  6,  6];

  var imgRemap = img.remap({
    from: fromList,
    to: toList,
    defaultValue: 0,
    //bandName:
  }); 
  return imgRemap; 
}

function generateSuperClasses(imgCollection){
  return imgCollection.map(generateSuperClass);
}

main(); 

function generateAndExportData(roi, nomeCidade2){
  var imgCollec = generateImgCollection(roi, 1985, 2020);
  
  imgCollec = generateSuperClasses(imgCollec); 
  exportImgCollection(imgCollec, roi, nomeCidade2, nomeCidade2+"_imagens", 35);
}












 




