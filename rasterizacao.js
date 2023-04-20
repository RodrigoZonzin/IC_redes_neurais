
/* VAR ABORDAGEM POR SETOR CENSITÁRIO */

 var parauapebas = ee.FeatureCollection("users/rodrigozonzin/Parauapebas_limitesPorSetorCensitario"),
     lauroDeFreitas = ee.FeatureCollection("users/rodrigozonzin/lauroDeFreitas_limitesPorSetorCensitario"),
     macae = ee.FeatureCollection("users/rodrigozonzin/macae_limitesPorSetorCensitario"),
     marica = ee.FeatureCollection("users/rodrigozonzin/marica_limitesPorSetorCensitario"),
     palmas = ee.FeatureCollection("users/rodrigozonzin/palmas_limitesPorSetorCensitario"),
     parnamirim = ee.FeatureCollection("users/rodrigozonzin/parnamirim_limitesPorSetorCensitario"),
     rioDasOstras = ee.FeatureCollection("users/rodrigozonzin/rioDasOstras_limitesPorSetorCensitario"),
     rioVerde = ee.FeatureCollection("users/rodrigozonzin/rioVerde_limitesPorSetorCensitario"),
     saoJoseDeRibamar = ee.FeatureCollection("users/rodrigozonzin/saoJoseDeRibamar_limitesPorSetorCensitario");
  
/* ABORDAGEM ADOTADA POR MARIO PUJATTI*/
var bq_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/barbacena_pujatti"),
    lauro_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/lauroDeFreitas_pujatti"),
    macae_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/macae_pujatti"),
    palmas_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/palmas_pujjatti"),
    parnamirim_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/parnamirim_pujatti"),
    marica_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/barcarena_pujatti"), 
    rioDasOstras_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/riodasostras_puj"), 
    rioVerde_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/rioVerde_puj"), 
    saoJoseRibamar_puj = ee.FeatureCollection("users/rodrigozonzin/ICRedes/saoJoseDeRibamar_puj");

var barcarena = ee.FeatureCollection("users/rodrigozonzin/barcarena_limitesPorSetorCensitario1"); 
     
var cidades = [parauapebas], //, lauro_puj, macae_puj, palmas_puj, parnamirim_puj, marica_puj, rioDasOstras_puj, rioVerde_puj, saoJoseRibamar_puj],
    nomeCidades = ["parauapebas"]; //, "lauroDeFreitas", "macae", "palmas", "parnamirim", "marica", "rioDasOstras", "rioVerde", "saoJoseDeRibamar"]; 
         
       
var ruasCidades= [r_parauapebas]; //r_lauroDeFreitas, r_macae, r_palmas,
         //r_parnamirim, r_marica, r_rioDasOstras,r_rioVerde, r_saoJoseDeRibamar];

function main(){
  
  //Map.addLayer(r_barcarena);
  //Map.addLayer(barcarena, {}, 'barcarena');
  
  for(var i =0; i< cidades.length; i++){
    generateAndExportData(ruasCidades[i], cidades[i], nomeCidades[i]); 

  }
}



function exportImage(img, roi, nomeCidade){
  Export.image.toDrive({
    image: img, 
    description: "rasterRua"+"_de_"+nomeCidade, 
    region: roi,
    scale: 30,
    folder: "raster"+"_de_"+nomeCidade+'_abordagem_setores', 
    maxPixels: 1e8
  });   
}





main(); 

function generateAndExportData(ruas, roi, nomeCidade2){
  var rasterizado = ruas.reduceToImage({
      properties: ['TOT_GERAL'],
      reducer: ee.Reducer.first()
  });
  
  rasterizado = rasterizado.clip(roi);
  rasterizado = rasterizado.toInt16();
  //Map.addLayer(roi); 
  Map.addLayer(rasterizado); 
  exportImage(rasterizado, roi, nomeCidade2); 

}
