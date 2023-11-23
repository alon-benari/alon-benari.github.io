
 
  var cy = cytoscape({
    container: document.getElementById('cy'),
    style:[
  
              {
                selector:'node.predecessor',
                style:{
                  'shape':'triangle',
                }
              },
              {
                selector:'edge.predecessor',
                style:{
                  'line-color':'#0F0'
                }
              },
              {
              selector: 'node.highlight',
              style: {
                  'border-color': '#F0F',
                  'border-width': '30px',
                 // 'background-color':'#FF0',
              }
              },
  
              {
                  selector: 'node.semitransp',
                  style:{ 'opacity': '0.1' }
              },
  
            // {
            //     selector: 'node.highlight',
            //     style: {
            //         'border-color': '#000',
            //         'border-width': '2px',
                    
            //     }
            // },
            {
                selector:'edge',
                style:{
                  'target-arrow-shape':'triangle',
                  'curve-style': 'bezier',
                  'width':function(elem){return 0.1*elem.data('count')},
                  'line-color':'blue',
                  'opacity':0.5
                  
                  
              }
            },
  
            {
              selector: 'edge.highlight',
              style: { 'mid-target-arrow-color': '#F00','line-color':'#CCF' }
          },
          {
              selector: 'edge.semitransp',
              style:{ 'opacity': '0.2' }
          },
  
            
                {
              selector: 'node',
              style: {
                              'content': 'data(label)',
                'width':function(elem){return 10*elem.data('width')},
                'height': function(elem){ return 10*elem.data('width')} , //'data(height)',
                'font-size':'150px',
                'label':'data(name)',
                'background-color':function(elem){return elem.data('color')},
                'background-color': 'mapData(color,0,30,red,green)'
                          }
                      },
  
                    ],
          layout:{name:'concentric',
            spacingFactor:5,
            nodeSpacing:20,
            padding:10,
            fit:true,
            animationDuration:1500,
            animate:true,
            // concentric:'concentric',
            boundingBox: { // to give cola more space to resolve initial overlaps
                  x1: 0,
                  y1: 0,
                  x2: 10000,
                  y2: 10000
                }
                },
          
          elements: data
       
  
  
  });
  
  cy.on('vclick', 'node', function(evt){
      console.log(evt)
      var node = evt.cyTarget;
      console.log(node)
      document.getElementById('plot0').innerHTML = node.data().name
      var data =[{
        x:node.data().t2appt,
        type:'histogram',
        marker:{
          color:'lightblue'
        }
      }]
      Plotly.newPlot('plot0',data)
  });

  cy.on('vclick','edge',function(evt){
    var edge = evt.cyTarget;
    console.log(evt)
    console.log(edge.data().sourceName+'--'+edge.data().targetName)
    document.getElementById("el").innerHTML = edge.data().sourceName+'--'+edge.data().targetName
    var data = [{
      x:edge.data().traffic_time,
      type:'histogram',
      marker:{
        color:'lightblue'
      }
    }]
    Plotly.newPlot('plot1',data)
  });


  cy.on('cxttap','node',function(e){
    var sel = e.cyTarget;
    console.log(sel)
    //cy.elements().removeClass('semitransp').removeClass('highlight')
    //cy.elements().difference(sel.incomers()).not(sel).addClass('predecessor')
    sel.incomers().removeClass('semitransp').removeClass('highlight').addClass('predecessor')
     sel.removeClass('highlight').incomers().addClass('predecessors')
  });

        
  cy.on('mouseover', 'node', function(e){
    var sel = e.cyTarget;
    //
    // clean up
    cy.elements().removeClass('prdecessor')
    // 
    // cy.elements().difference(sel.outgoers()).not(sel).addClass('semitransp');
    sel.addClass('highlight').outgoers().addClass('highlight');
    // var id = e.target.id();
    // var outgoing = cy.edges("[source='"+id+"']")
    // outgoing.addClass('highlight')
});
 cy.on('mouseout', 'node', function(e){
    var sel = e.cyTarget;
    
    cy.elements().removeClass('semitransp');
    sel.removeClass('highlight').outgoers().removeClass('highlight');   
    
    cy.elements().removeClass('predecessor')
    sel.incomers().removeClass('predecessor')

    
 });
  
      
