$(function ()
{
  //variable declaration
  var noOfPages=0;
  var item=[];
  var search;
  var j;//for iteration

  //search button click event
  $('.searchButton').on('click',function(){
    if($('.search').val().length>0)
    {
      search="http://www.omdbapi.com/?s="+$('.search').val();
      ajaxCall();//ajaxCall for ajax function
    }
    else {
      $('#page').children().remove();
      $('#movie').children().remove();
      $('#movie').append('<li><h2> OOPS! No keyword entered, Plz enter keyword to make search</h2><hr></li>');
    }
  });

  //enter key press event
  $(document).keypress(function (e) {
    if (e.which == 13) {
      if($('.search').val().length>0)
      {
        search="http://www.omdbapi.com/?s="+$('.search').val();
        ajaxCall();
      }
      else {
        $('#page').children().remove();
        $('#movie').children().remove();
        $('#movie').append('<li><h2> OOPS! No keyword entered, Plz enter keyword to make search</h2><hr></li>');
      }
    }
  });
  //ajaxCall function to request data through omdb api
  function ajaxCall()
  {
    $.ajax(
      {
        type:'GET',
        url:search,
        success:function(data)
        {
          $('#page').children().remove();
          $('#movie').children().remove();
          if(data.Response==="False")
          {
            $('#movie').append('<li><h2> OOPS! '+data.Error+' Change the Keywords and try again</h2><hr></li>');
          }
          else {
            item=data.Search;
            noOfPages=Math.ceil(item.length/3);
            pageContent(1);
            //pagination
            for(var z=1;z<=noOfPages;z++)
            {
              $('#page').append('<li><button type="button" class="btn btn-md pageClass" id="btn'+z+'">'+z+'</button></li>&nbsp;');
            }
            $('#btn1').addClass('btn-success');
            $('.pageClass').on('click',function()
            {
              var btnId=$(this).attr('id');
              var btnNo=Number(btnId.slice(3));
              $('ul:last').children().children().removeClass('btn-success');
              $('#'+btnId).addClass('btn-success');
              pageContent(btnNo);
            }
          );
        }
      },
      //error handling
      error: function()
      {
        $('#page').children().remove();
        $('#movie').children().remove();
        $('#movie').append('<li><h2> OOPS! Network Connction error, Check your internet connection and try again after some time</h2><hr></li>');
      }
    });
  }
  //displaying movie content using pageContent
  function pageContent(limit)
  {
    $('#movie').children().remove();
    $('#movie').append('<div class="row"><h2>&nbsp;&nbsp;Here are your movie results...</h2></div>');
    $('#movie').append('<div class="row">');
    if(item.length<(limit*3))
    {
      for(j=(limit-1)*3;j<item.length;j++)
      {
        if(item[j].Poster=="N/A")
        {
          $('#movie').append('<center><div class="col-md-4 colHeight"><br><li><img src="../images/noImage.jpg"'+' alt="NO IMAGE AVAILABLE">'+'<br>Title : '+item[j].Title+'<br>Year : '+item[j].Year+'<br>ImdbId : '+item[j].imdbID+'<br>Type : '+item[j].Type+'</li></div></center>');
        }
        else{
          $('#movie').append('<center><div class="col-md-4 colHeight"><br><li> <img src="'+item[j].Poster+'" alt="NO IMAGE AVAILABLE">'+'<br>Title : '+item[j].Title+'<br>Year : '+item[j].Year+'<br>ImdbId : '+item[j].imdbID+'<br>Type : '+item[j].Type+'</li></div></center>');
        }
      }
    }
    else {
      for(j=(limit-1)*3;j<(limit-1)*3+3;j++)
      {
        if(item[j].Poster=="N/A")
        {
          $('#movie').append('<center><div class="col-md-4 colHeight"><br><li><img src="../images/noImage.jpg"'+' alt="NO IMAGE AVAILABLE">'+'<br>Title : '+item[j].Title+'<br>Year : '+item[j].Year+'<br>ImdbId : '+item[j].imdbID+'<br>Type : '+item[j].Type+'</li></div></center>');
        }
        else{
          $('#movie').append('<center><div class="col-md-4 colHeight"><br><li> <img src="'+item[j].Poster+'" alt="NO IMAGE AVAILABLE">'+'<br>Title : '+item[j].Title+'<br>Year : '+item[j].Year+'<br>ImdbId : '+item[j].imdbID+'<br>Type : '+item[j].Type+'</li></div></center>');
        }
      }
    }
    $('#movie').append('</div>');
  }
});
