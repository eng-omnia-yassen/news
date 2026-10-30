async function getData(category="business",page=1,search=""){
    let parameters=new URLSearchParams({
        category:category,
        q:search,
        pageSize:10,
        page:page,
        from:"2026-10-20",
        sortBy:"publishedAt",
        apiKey:"dc634f74813f4ce7957a61d41f259798"
    })
    let response= await fetch(`https://newsapi.org/v2/top-headlines?${parameters.toString()}`)
    let data =await response.json()
    showData(data,page)
}

function showData(data,currentPage){
    let numberOfPages= Math.ceil(data.totalResults/10),
    articles=data.articles,
    dataContainer=$("#Data .row");
    dataContainer.html('');
    if(articles.length>0){
        for(let item of articles){
               
            dataContainer.append(cardComponent(item))
        }
        $("nav .pagination").html(preparePagination(currentPage,numberOfPages))
    }else{

    }
}
function cardComponent(item){
    return`
        <div class="col-lg-4 col-md-6">
            <div class="card m-auto" style="width: 18rem;">
            <img src="${item.urlToImage??'images/default-image-icon-missing-picture-page-vector-40546530.webp'}" onerror='this.src="images/default-image-icon-missing-picture-page-vector-40546530.webp"' class="card-img-top" alt="...">
            <div class="card-body d-flex justify-content-center align-items-center">
                    <div class='box'>
                        <h5 class="card-title">${item.title?.slice(0,20)}...</h5>
                        <p class="card-text">${item.description?.slice(0,150)?? 'their is no description'}...</p>
                        <a href="${item.url}" target="blank" class="btn  d-block m-auto ">See More</a>
                    </div>
                        
                    </div>
            </div>
        </div>
    `;
}

function preparePagination(currentPage,totalPages){
    let lis =`
        <li class="page-item ${currentPage==1 ?'disabled':''}"><a class="page-link" onclick="pagination(${(currentPage>1)?(currentPage-1):1})">Previous</a></li>
    `;
    lis += `
    `;
    for(let i=1; i<=totalPages;i++){
     lis +=`
            <li class="page-item ${(currentPage==i)? 'active':''} "><a class="page-link" onclick="pagination(${i})">${i}</a></li>
        `;
    }
    lis +=`<li class="page-item ${currentPage==totalPages ?'disabled':''}"><a class="page-link" onclick="pagination(${(currentPage<totalPages)?(currentPage+1):totalPages})">Next</a></li>`;
    return lis
}

function pagination(pageNumber){
    let category=$('#Category').val(),
        search=$('#Search').val();
    getData(category,pageNumber,search)

}