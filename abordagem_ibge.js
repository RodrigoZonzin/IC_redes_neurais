//THE IMPORT OF GEOMETRIES, RASTERS AND OTHERS MUST COME HERE
var ma = ee.FeatureCollection("users/rodrigozonzin/setores/MA_Setores_2021"),
    mg = ee.FeatureCollection("users/rodrigozonzin/setores/MG_Setores_2020"),
    pa = ee.FeatureCollection("users/rodrigozonzin/setores/PA_Setores_2021"),
    to = ee.FeatureCollection("users/rodrigozonzin/setores/TO_Setores_2021"),
    rj = ee.FeatureCollection("users/rodrigozonzin/setores/RJ_Setores_2021"),
    ba = ee.FeatureCollection("users/rodrigozonzin/setores/BA_Setores_2020"),
    rn = ee.FeatureCollection("users/rodrigozonzin/setores/RN_Setores_2021"),
    go = ee.FeatureCollection("users/rodrigozonzin/setores/GO_Setores_2021");



//THIS FUNCTION EXISTS TO ORGANIZE THE CODE 
//ANY OTHER FUNCTION MUST BE DEFINED BELLOW IT 
function main(){
  var cityName ="Antônio Carlos", //
      state = mg, //abbreviation. please check the letters on import section
      exportName = "antonioCarlos" ; //unfortunately JS on GEE doesn't work natively, then you have towrite it again
  
  var roi = state.filterMetadata("NM_MUN", "equals", cityName);
                 //.filterMetadata("NM_DIST", "equals", cityName); //roi = region of interest 
      
  var parameter = "NM_SIT", //the name of the parameter to apply the filter
      valueOfParameter = "Área Urbana de Alta Densidade de Edificações"; //value to compare
  
  //var roiFiltered = roi.filterMetadata(parameter, "equals", valueOfParameter);
  //roiFiltered = roiFiltered.geometry().buffer(100);
  
  //IN CASE YOUR ROI SHOWS A ROUGH BEHAVIOUR 
  //YOU CAN DRAWN A POLYGON TO FILL EMPTY AREAS 
  //OR SPECIFY BORDERS TO CUT THOSE DISCONTINUOUS
  
  //roiFiltered = intersec.intersection(roiFiltered);
  //roiFiltered = unionn.union(roiFiltered);
  
  
  //var newShape = roi.intersection(); 
  Map.addLayer(roi, {}, "Original shapefile"); 
  //Map.addLayer(roiFiltered, {}, "Resized shapefile"); 
  
  exportShapefile(roi, exportName); 
  //exportShapefileToAssets(roiFiltered, exportName); 
}
main(); 

function exportShapefile(myShape, cityName){
  Export.table.toDrive({
    collection: ee.FeatureCollection(myShape), 
    description: cityName+"_limitesPorSetorCensitario", 
    folder: "abordagem_setores",//+cityName, 
    //fileNamePrefix, 
    fileFormat: "SHP", 
    //selectors, 
    //maxVertices
  });
}

function exportShapefileToAssets(myShape, cityName){
  Export.table.toAsset({
    collection: ee.FeatureCollection(myShape), 
    description:cityName+"_limitesPorSetorCensitario", 
    //assetId: 'projects/<shps>/assets/<shpssetoresIC>', 
    //maxVertices
  }); 
}

function replace(string){
  var myStr = ee.String(string); 
  return myStr.replace(' ', '_', 'g');
}
