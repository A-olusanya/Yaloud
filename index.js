
// function for sign up 
function signUp(event) {
    // prevent page from refreshing
    event.preventDefault();

    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    // getting your values from the form
    const getName = document.getElementById("name").value;
    const getEmail = document.getElementById("email").value;
    const getPassword = document.getElementById("password").value;
    const getConfirmPassword = document.getElementById("confirmPassword").value;

    // checking for validation
    if (getName === "" || getEmail === "" || getPassword === "" || getConfirmPassword === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are Required!',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }

    if (getConfirmPassword !== getPassword) {
        Swal.fire({
            icon: 'info',
            text: 'Passwords Do not match',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }

    else {

        // convert to form data
        const signData = new FormData();
        signData.append("name", getName);
        signData.append("email", getEmail);
        signData.append("password", getPassword);
        signData.append("password_confirmation", getConfirmPassword);

        const signMethod = {
            method: 'POST',
            body: signData
        }

        // create your url
        const url = "https://pluralcodesandbox.com/yorubalearning/api/register_admin";

        fetch(url, signMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)

            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })

                setTimeout(() => {
                    location.href = "index.html"
                }, 3000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));

    }

}

// function for log in
function logIn(event) {
    // prevent page from refreshing
    event.preventDefault();

    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    // getting your values from the form
    const getEmail = document.getElementById("email").value;
    const getPassword = document.getElementById("password").value;

    // checking for validation
    if (getEmail === "" || getPassword === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are Required!',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }
    else {
        // convert to form data
        const signData = new FormData();
        signData.append("email", getEmail);
        signData.append("password", getPassword);

        const signMethod = {
            method: 'POST',
            body: signData
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";

        fetch(url, signMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem("admin", JSON.stringify(result));

            if (result.hasOwnProperty("email")) {
                location.href = "dashboard.html"
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: 'All fields are Required!',
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));

    }
}

function getDashBoardApi() {
    const getAdmin = document.getElementById("adminId");
    const getCategory = document.getElementById("category");
    const getLearnmat = document.getElementById("learnmat");
    const getSubCat = document.getElementById("subCat");
    const getQuiz = document.getElementById("quiz");
    const getStudent = document.getElementById("student");


    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);

    const dashMethod = {
        method: 'GET',
        headers: dashHeader
    }

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";


    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        getAdmin.innerHTML = `Hello, ${result.admin_name}`;
        getCategory.innerHTML = `${result.total_number_of_categories}`;
        getLearnmat.innerHTML = `${result.total_number_of_learningmaterial}`;
        getSubCat.innerHTML = `${result.total_number_of_subcategories}`;
        getQuiz.innerHTML = `${result.total_number_of_quize}`;
        getStudent.innerHTML = `${result.total_number_of_students}`;

        getSpin.style.display = "none";

    })
    .catch(error => console.log('error', error));
}


function studentModal(event) {
    event.preventDefault();
    const getTopThree = document.querySelector(".allstudent");

    const getModal = document.getElementById("dash-modal");
    getModal.style.display = "block";

    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);

    const dashMethod = {
        method: 'GET',
        headers: dashHeader
    }

    let data = [];

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";

    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.length === 0) {
            getTopThree.innerHTML = "No Records Found!";
        }
        else {
            result.map((item) => {
                data += `
                <div class="search-card">
                    <div class="d-flex justify-content-between">
                        <h5 class="mt-3">Image:</h5>
                        <img src=${item.image} alt="img" class="w-25">
                    </div>
                    <div class="d-flex justify-content-between">
                        <h5>Name:</h5>
                        <p>${item.name}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <h5>Email:</h5>
                        <p>${item.email}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <h5>Phone Number:</h5>
                        <p>${item.phone_number}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <h5>Position:</h5>
                        <p>${item.position}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <h5>Total Score:</h5>
                        <p>${item.total_score}</p>
                    </div>
             </div>
                `
                getTopThree.innerHTML = data;
            })
        }
    })
    .catch(error => console.log('error', error));
}

function closeDashModal() {
    const getModal = document.getElementById("dash-modal");
    getModal.style.display = "none";
}

function getAllStudents() {
    const getTableBody = document.getElementById("table-id");


    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);

    const dashMethod = {
        method: 'GET',
        headers: dashHeader
    }

    let data = [];

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students";

    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.length === 0) {
            getTableBody.innerHTML = "No Records Found!";
            getSpin.style.display = "none";
        }
        else {
            result.map((item) => {
                data += `
                   <tr>
                      <td>${item.name}</td>
                      <td>${item.email}</td>
                      <td>${item.phone_number}</td>
                      <td>${item.position}</td>
                      <td>${item.total_score}</td>
                   </tr>
                `
                getTableBody.innerHTML = data;
                getSpin.style.display = "none";
            })
        }
    })
    .catch(error => console.log('error', error));
}


function createCategory(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    const catName = document.getElementById("cat").value;
    const catImage = document.getElementById("imcat").files[0];

    if (catName === "") {
        Swal.fire({
            icon: 'info',
            text: 'All Fields Required!',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }
    else {
        const getToken = localStorage.getItem("admin");
        const myToken = JSON.parse(getToken);
        const token = myToken.token;

        const dashHeader = new Headers();
        dashHeader.append("Authorization", `Bearer ${token}`);

        const catData = new FormData();
        catData.append("name", catName);
        catData.append("image", catImage);

        const dashMethod = {
            method: 'POST',
            headers: dashHeader,
            body: catData
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/create_category";

        fetch(url, dashMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })

                setTimeout(() => {
                    location.reload();
                }, 3000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
            }
        })
        .catch(error => console.log('error', error));
        
    }

}

function getCategoryList() {
    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const showItem = document.querySelector(".scroll-object");

    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);

    const dashMethod = {
        method: 'GET',
        headers: dashHeader
    }

    let data = [];

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/category_list";

    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.length === 0) {
            showItem.innerHTML = "No Category Found";
            getSpin.style.display = "none";
        }
        else {
            result.map((item) => {
                data += `
                    <div class="search-card">
                      <a href="details.html?name=${item.name}&id=${item.id}"><img src=${item.image} alt="image"></a>
                      <p class="mt-3">${item.name}</p>

                      <div class="text-right">
                        <button class="update-button" onclick="modalBox(${item.id})">update</button>
                        <button class="delete-button" onclick="delCat(${item.id})">delete</button>
                      </div>
                    </div>
                `
                showItem.innerHTML = data;
                getSpin.style.display = "none";
            })
        }
    })
    .catch(error => console.log('error', error));
}

let globalId;

function modalBox(catId) {
    globalId = catId;
    const showModal = document.getElementById("my-modal3");
    showModal.style.display = "block";

    console.log(globalId)

    const getUpName = document.getElementById("updateName");

    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);

    const dashMethod = {
        method: 'GET',
        headers: dashHeader
    }

    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/get_details?category_id=${catId}`;

    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        getUpName.setAttribute("value", `${result.name}`);
    })
    .catch(error => console.log('error', error));

}


function closeModal3() {
    const showModal = document.getElementById("my-modal3");
    showModal.style.display = "none"
}

function updateCategory(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".spin2");
    getSpin.style.display = "inline-block";

    const catName = document.getElementById("updateName").value;
    const catImage = document.getElementById("updateImage").files[0];

    if (catName === "") {
        Swal.fire({
            icon: 'info',
            text: 'All Fields Required!',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }

    else {
        const getToken = localStorage.getItem("admin");
        const myToken = JSON.parse(getToken);
        const token = myToken.token;

        const dashHeader = new Headers();
        dashHeader.append("Authorization", `Bearer ${token}`);

        const catData = new FormData();
        catData.append("name", catName);
        catData.append("image", catImage);
        catData.append("category_id", globalId)

        const dashMethod = {
            method: 'POST',
            headers: dashHeader,
            body: catData
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/update_category";

        fetch(url, dashMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })

                setTimeout(() => {
                    location.reload();
                }, 3000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
            }
        })
        .catch(error => console.log('error', error));

    }

}

function delCat(delId) {
    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);

    const delMethod = {
        method: 'GET',
        headers: dashHeader
    }

    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/delete_category/${delId}`;

    fetch(url, delMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.status === "success") {
            Swal.fire({
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: '#2D85DE'
            })

            setTimeout(() => {
                location.reload();
            }, 3000)
        }
        else {
            Swal.fire({
                icon: 'info',
                text: `${result.message}`,
                confirmButtonColor: '#2D85DE'
            })
        }

    })
    .catch(error => console.log('error', error))

}

function gotoLoginPage(event) {
    event.preventDefault();
    location.href = "index.html"
}

function ShowCategoryName() {
    const params = new URLSearchParams(window.location.search);
    const showCatName = params.get('name');

    const myNameValue = document.querySelector(".det");
    myNameValue.innerHTML = showCatName;
}


function subCategory(event) {
    event.preventDefault();

    const params2 = new URLSearchParams(window.location.search);
    const showCatId = params2.get('id');

    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    const subCat = document.getElementById("subCatName").value;
    const subImg = document.getElementById("subCatImg").files[0];

    if (subCat === "") {
        Swal.fire({
            icon: 'info',
            text: 'All Fields Required!',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }

    else {
        const getToken = localStorage.getItem("admin");
        const myToken = JSON.parse(getToken);
        const token = myToken.token;

        const dashHeader = new Headers();
        dashHeader.append("Authorization", `Bearer ${token}`);

        const catData = new FormData();
        catData.append("name", subCat);
        catData.append("image", subImg);
        catData.append("category_id", showCatId)

        const dashMethod = {
            method: 'POST',
            headers: dashHeader,
            body: catData
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/create_subcategory";

        fetch(url, dashMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
    
                setTimeout(() => {
                    location.reload();
                }, 3000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error))
    }

}

function getSubCatDetails() {
    const params3 = new URLSearchParams(window.location.search);
    const showCatId = params3.get('id');

    const showRowItem = document.querySelector(".row");

    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);

    const delMethod = {
        method: 'GET',
        headers: dashHeader
    }

    let data = [];

    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/category_details/${showCatId}`;

    fetch(url, delMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.length === 0) {
            showRowItem.innerHTML = "No subcategory found"
        }
        else {
            result.map((item) => {
                data += `
                  <div class="col-sm-12 col-md-12 col-lg-4">
                     <div class="search-card">
                        <img src=${item.image} alt="image">
                        <p class="mt-3">${item.name}</p>

                        <div class="text-right">
                        <button class="update-button" onclick="modalSubCategory(${item.id})">update</button>
                      </div>
                     </div>
                  </div>
                `

                showRowItem.innerHTML = data;
            })
        }
    })
    .catch(error => console.log('error', error))
}






// function updateSubCategory(subCategoryId) {
//     const updateModal = document.getElementById("my-modal-mode");
//     updateModal.style.display = "block"; // Open the update modal

//     const updateButton = document.getElementById("updateSubCategory");

//     // // Add a click event listener to the update button
//     // updateButton.addEventListener("click", function () {
       
//     // });

//     const subCatName = document.getElementById("updateSubName").value;
//     const subCatImage = document.getElementById("updateSubImage").files[0];

//     if (subCatName === "") {
//         Swal.fire({
//             icon: 'info',
//             text: 'Subcategory name is required!',
//             confirmButtonColor: '#2D85DE'
//         });
//         return;
//     }

//     const getToken = localStorage.getItem("admin");
//     const myToken = JSON.parse(getToken);
//     const token = myToken.token;

//     const dashHeader = new Headers();
//     dashHeader.append("Authorization", `Bearer ${token}`);

//     const subCatData = new FormData();
//     subCatData.append("name", subCatName);
//     subCatData.append("image", subCatImage);
//     subCatData.append("sub_category_id", subCategoryId); // Use the parameter here

//     const dashMethod = {
//         method: 'POST',
//         headers: dashHeader,
//         body: subCatData,
//     };

//     const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/update_subcategory";

//     fetch(url, dashMethod)
//         .then(response => response.json())
//         .then(result => {
//             console.log(result);
//             if (result.status === "success") {
//                 Swal.fire({
//                     icon: 'success',
//                     text: `${result.message}`,
//                     confirmButtonColor: '#2D85DE'
//                 });

//                 closeModalMode(); 

               
//                 getSubCatDetails(); 
//             } else {
//                 Swal.fire({
//                     icon: 'info',
//                     text: `${result.message}`,
//                     confirmButtonColor: '#2D85DE'
//                 });
//             }
//         })
//         .catch(error => console.log('error', error));
// }

let globalSubId;
function modalSubCategory(subId) {
    
    globalSubId = subId;
    const updateModal = document.getElementById("my-modal-mode");
    updateModal.style.display = "block";

    const subCatName = document.getElementById("updateSubName");

    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);

    const dashMethod = {
        method: 'GET',
        headers: dashHeader,
    };
        
    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/get_details?subcategory_id=${subId}`;
        
    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        subCatName.setAttribute("value", `${result.name}`)
    })
    .catch(error => console.log('error', error));

}

function updateSubCategory(event){
    event.preventDefault();
    const getSpin = document.querySelector(".spin2");
    getSpin.style.display = "inline-block";
    const subCatName = document.getElementById("updateSubName").value;
    const subCatImage = document.getElementById("updateSubImage").files[0];

    if (subCatName === "") {
        Swal.fire({
            icon: 'info',
            text: 'Subcategory name is required!',
            confirmButtonColor: '#2D85DE'
        })
    }
    else {
        const getToken = localStorage.getItem("admin");
        const myToken = JSON.parse(getToken);
        const token = myToken.token;

        const dashHeader = new Headers();
        dashHeader.append("Authorization", `Bearer ${token}`);

        const subCatData = new FormData();
        subCatData.append("name", subCatName);
        subCatData.append("image", subCatImage);
        subCatData.append("subcategory_id", globalSubId); // Use the parameter here

        const dashMethod = {
            method: 'POST',
            headers: dashHeader,
            body: subCatData,
        };

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/update_subcategory";

        fetch(url, dashMethod)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.status === "success") {
                    Swal.fire({
                        icon: 'success',
                        text: `${result.message}`,
                        confirmButtonColor: '#2D85DE'
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                } 
                
                
                else {
                    Swal.fire({
                        icon: 'info',
                        text: `${result.status}`,
                        confirmButtonColor: '#2D85DE'
                    });

                    getSpin.style.display = "none";

                }
            })
            .catch(error => console.log('error', error));
    }

    
}




function closeModalMode() {
    const updateModal = document.getElementById("my-modal-mode");
    updateModal.style.display = "none"; // Close the modal
}








function logout() {
    localStorage.clear();
    location.href = "index.html";
}