var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCat");
var productDesc = document.getElementById("productDesc");
var productList;
var addBtn = document.getElementById("addBtn")


if (localStorage.getItem("list") != null) {
    productList = JSON.parse(localStorage.getItem("list"))
    displayProduct(productList)
} else {
    productList = []
}

function addProduct() {
    if (productName.value == "") {
        document.getElementById("warn").classList.replace("d-none", "d-block")
    } else {
        var product = {
            name: productName.value,
            price: productPrice.value,
            cat: productCat.value,
            desc: productDesc.value
        }
        clearForm()
        document.getElementById("warn").classList.replace("d-block", "d-none")

        productList.push(product)
        setData()
        displayProduct(productList);
    }
}

function clearForm() {
    productName.value = ""
    productPrice.value = ""
    productCat.value = ""
    productDesc.value = ""
}

function deleteProduct(index) {
    productList.splice(index, 1)
    displayProduct(productList)

    setData()
}

function displayProduct(list) {
    var cartona = ""
    for (var i = 0; i < list.length; i++) {
        cartona += ` <tr>
                    <td class="bg-info text-white">${i+1}</td>
                    <td>${list[i].newName?list[i].newName:list[i].name}</td>
                    <td>${list[i].price}</td>
                    <td>${list[i].cat}</td>
                    <td>${list[i].desc}</td>
                    <td>
                        <button class="btn btn-warning" onclick="getProductData(${i})">Update</button>
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick=deleteProduct(${i})>Delete</button>
                    </td>
                </tr>`
    }
    document.getElementById("tableData").innerHTML = cartona

}


function search(searchKey) {
    var searchList = []
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(searchKey.toLowerCase())) {
            searchList.push(productList[i]);
            productList[i].newName = productList[i].name.replace(searchKey, `<span class="fw-bolder text-danger ">${searchKey}</span>`)
            displayProduct(searchList)
        } else {
            document.getElementById('noData').innerHTML = "THERE IS NO OTHER DATA"
            displayProduct(searchList)
        }

    }



}


function getProductData(index) {

    productName.value = productList[index].name
    productPrice.value = productList[index].price
    productCat.value = productList[index].cat
    productDesc.value = productList[index].desc;
    addBtn.classList.add("d-none")
    document.getElementById("updateBtn").classList.replace("d-none", "d-inline-block")

}

function update(index) {
    if (productName.value == "") {
        document.getElementById("warn").classList.replace("d-none", "d-block")
    } else {
        productList[0].name = productName.value,
            productList[0].price = productPrice.value,
            productList[0].cat = productCat.value,
            productList[0].desc = productDesc.value
        displayProduct(productList)
        clearForm()
        document.getElementById("warn").classList.replace("d-block", "d-none")

        addBtn.classList.remove("d-none")
        document.getElementById("updateBtn").classList.replace("d-inline-block", "d-none")
        setData()
    }
}



function setData() {
    localStorage.setItem("list", JSON.stringify(productList))

}