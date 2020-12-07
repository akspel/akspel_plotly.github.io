function init() {
    var dropDown = d3.select("#selDataset");
    d3.json("samples.json").then((data)=>{
        var sampleNames = data.names;
        sampleNames.forEach((sample)=>{
            dropDown
            .append("option")
            .text(sample)
            .property("value", sample);
        });
        var firstSample = sampleNames[0];
        buildPlots(firstSample);


    });
}
function buildPlots(sample) {
    d3.json("samples.json").then((data)=>{
       var samples = data.samples;
       var results = samples.filter(sampleObj=>sampleObj.id==sample);
       var singleResult = results[0];
       var otu_ids = singleResult.otu_ids;
       var otu_labels = singleResult.otu_labels;
       var sample_values = singleResult.sample_values;
       var bubbleChart_layout = {
        title: "Bacteria Cultures Per Sample",
        margin: {t:0},
        hovermode: "closest",
        xaxis: {title:"otu_id"},
        margin: {t:30}
       };
       var bubbleChart_data = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
            size:sample_values,
            color:otu_ids,
            colorscale:"Earth"
        }
       }];
       Plotly.newPlot("bubble", bubbleChart_data, bubbleChart_layout);

       var ids = samples.samples[0].otu_ids;
       var sampleValues = samples.samples[0].sample_values.slice(0,10).reverse()
       var labels = samples.samples[0].otu_labels.slice(0,10);
       var otuTop = (samples.samples[0].otu_ids.slice(0,10)).reverse();
       var otuId = otuTop.map(d => "OTU" + d);
       var labels = samples.samples[0].otu_labels.slice(0,10);

       var barChart_trace = {
           x: samples,
           y: otuId,
           text: labels,
           marker: {
               color: 'blue'},
            type: "bar"
            orientation: "h",
       };

       var barChart_data = [barChart_trace];

       var barChart_layout = {
           title: "Top 10 OTU",
           yaxis:{
               tickmode:"linear"},
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }   
       };
       Plotly.newPlot("bar", data, layout);
       
    });
}
function optionChanged(newSample) {
    buildPlots(newSample);
}

function get demoInfo(id) {
    d3.json("samples.json").then((data=> {
        var metadata = data.metadata;

        console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() ===id)[0];
        var demographicInfo = d3.select("sample-metadata")

        demographicInfo.html("");

        Object.defineProperties(result.forEach((key) => {
            demographicInfo.append("h5".text(key[0].toUpperCase() + ": " + key[1] + "\n");)
        });
    });
}


init();