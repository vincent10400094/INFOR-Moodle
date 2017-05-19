import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <nav class="navbar navbar-default">
         <div class="container">
            <div class="navbar-header">
               <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
               <span class="sr-only">Toggle navigation</span>
               <span class="icon-bar"></span>
               <span class="icon-bar"></span>
               <span class="icon-bar"></span>
               </button>
               <a class="navbar-brand" href="/">Home</a>
            </div>
            <div id="navbar" class="collapse navbar-collapse">
   <ul class="nav navbar-nav">
      <li><a href="/history">History</a></li>
      <li><a href="/test">題目列表</a></li>
   </ul>
   <form class="navbar-form navbar-left" action="/search" method="GET" id="searchbar">
        <div class="form-group has-success">
          <input type="text" name="keyword" class="form-control" placeholder="Search" autocomplete="off"></input>
        </div>
      </form>
</div>
         </div>
      </nav>
    );
  }
}

export default Navbar;
