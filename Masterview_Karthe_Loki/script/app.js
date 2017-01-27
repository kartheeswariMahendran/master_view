// create a class named DataBlock
var DataBlock = React.createClass({
            getInitialState:function(){
                return {data:[]};
            },
// function used to populate the json data
            componentDidMount:function() {
                var a=this;
                $.getJSON(this.props.url, function(data) {
                a.setState({data:data})
            });
            },
// onclick event function 
            fun:function(jsonData,index,event){
                var dinoDetails=[];
                var keyval=index;//ID of the clicked name
                var d=Object.values(jsonData);//values of json data
                for(var i=0;i<d.length;i++)
                {
                    if(keyval==i)//checking id and key index
                    {
                        var jsonObj=d[i];
                        var details=Object.keys(jsonObj).map(function (key) { 
                          dinoDetails.push(key+":"+jsonObj[key]);//pushing key and value of clicked items into the array
                        });
                    }
                }
                var imgsrc="<img class='img-responsive img-dino' src='images/dinoimg.png' alt='dinoimg' width='100' height='100'>" 
                $("#content").empty();
                $("#content").append(imgsrc);
                $("#content").append("<p id='facts'>FACTS ABOUT DINOSAUR</p>");
                $.each(dinoDetails,function(i){
                      $("#content").append("<p class='fact-info'>"+dinoDetails[i]+"</p>");//adding dino details to the content section
                })
                var matchvar=window.matchMedia('(max-width: 480px)');
                  if(matchvar.matches){// mobile view
                      $("#nameList").hide();
                      $("#content").show();
                      $("#content").append("<button id='backbtn' class='btn-success'>Back</button>");
                      $("#backbtn").on('click',function(){
                           $("#content").hide();
                           $("#nameList").show();
                         });
                    }
                    else{
                      $("#nameList").show();
                      $("#content").show();
                      $("#backbtn").remove();   
                  }
                matchvar.addListener(function(m)//adding event listener for mobile view
                {
                  if(m.matches)
                  {
                    $("#nameList").show();
                    $("#content").hide();
                    $("#backbtn").remove();
                    $("#content").append("<button id='backbtn' class='btn-success'>Back</button>");
                    $("#backbtn").on('click',function(){
                         $("#content").hide();
                         $("#nameList").show();
                       });
                  }
                  else
                  {
                      $("#nameList").show();
                      $("#backbtn").remove();
                  } 
                });         
            }.bind(this),             
// render function
            render: function() {    
                  var obj=this.state.data;//obj contains json data
                  var jsonKey=Object.keys(obj);
                  //looping to get dinosaur names
                  var dinoNames=jsonKey.map(function (dinoKey,i) {
                      return(                     
                              <li className="nav nav-tabs nav-pills nav-stacked well" onClick={this.fun.bind(this,obj,i)} key={dinoKey}  data-key={dinoKey}>{dinoKey}<p className='arrow glyphicon glyphicon-chevron-right'></p></li>
                            );
                  },this);
                      return (
                              <div>
                                <ul className="nav nav-tabs nav-pills nav-stacked well">{dinoNames}</ul>
                              </div>
                              );
              }});
ReactDOM.render(
                <DataBlock url="data/data.json"/>,
                document.getElementById('nameList') );
        
       
