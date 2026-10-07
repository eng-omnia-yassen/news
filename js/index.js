getData()

let form=document.querySelector('#filter form');
form.addEventListener('submit',function(e){
    e.preventDefault();
    let category=$('#Category').val(),
        search=$('#Search').val();
    getData(category,1,search)
})