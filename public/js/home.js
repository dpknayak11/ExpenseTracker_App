const buypremuim = document.getElementById("rzp-button1");
const premiumUserMSG = document.getElementById("message");
const leaderBoardBtn = document.getElementById('leaderboardBtn');
const reportBtn = document.getElementById('reportBtn');
const table = document.getElementById("listOfItems");
const logoutBtn = document.getElementById("logoutBtn");
const paginationUL = document.getElementById("paginationUL");


async function isPremiumUser() {
    const token = localStorage.getItem('accessToken')
    const decodedToken = parseJwt(token)
    console.log(decodedToken)
    const ispremium = decodedToken.ispremiumuser;
    if (ispremium) {
        buypremuim.style.display = "none"
        premiumUserMSG.innerHTML = "Premium User &#128081";
        leaderBoardBtn.removeAttribute("onclick");
        leaderBoardBtn.setAttribute("href", "/leaderboard");
        reportBtn.removeAttribute("onclick");
        reportBtn.setAttribute("href", "/report");
    }
}

var pagesize = 6
let currentPage = 1;
document.getElementById("dynamicPageSize").addEventListener("change", function() {
    pagesize = this.value;
    getAllExpenses(currentPage, pagesize);
});

async function getAllExpenses(page) {
    try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get(`/getAllExpenses/${page}?pagesize=${pagesize}`, { headers: { "Authorization": token } });
        table.innerHTML = ""; // Clear existing table

        res.data.expenses.forEach((expenses) => {
            // Create table rows and cells for each expense
            // (same as your existing code)
            const id = expenses.id;
            const date = expenses.date;
            const amount = expenses.amount;
            const description = expenses.description;
            const category = expenses.category;

            let tr = document.createElement("tr");
            tr.className = "trStyle";
            table.appendChild(tr);

            let idValue = document.createElement("th");
            idValue.setAttribute("scope", "row");
            idValue.setAttribute("style", "display: none");

            let th = document.createElement("th");
            th.setAttribute("scope", "row");

            tr.appendChild(idValue);
            tr.appendChild(th);

            idValue.appendChild(document.createTextNode(id));
            th.appendChild(document.createTextNode(date));

            let td1 = document.createElement("td");
            td1.appendChild(document.createTextNode(amount));

            let td2 = document.createElement("td");
            td2.appendChild(document.createTextNode(description));

            let td3 = document.createElement("td");
            td3.appendChild(document.createTextNode(category));

            let td4 = document.createElement("td");

            let deleteBtn = document.createElement("button");
            deleteBtn.className = "editDelete btn btn-danger delete";
            deleteBtn.id = "dltbtn"
            deleteBtn.appendChild(document.createTextNode("Delete"));

            let editBtn = document.createElement("button");
            editBtn.className = "editDelete btn btn-success edit";
            editBtn.appendChild(document.createTextNode("Edit"));

            td4.appendChild(deleteBtn,);
            td4.appendChild(editBtn);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            deleteBtn.onclick = (e) => deleteFunction(e, expenses.id);
        });

        // Update pagination
        paginationUL.innerHTML = ""; // Clear existing pagination

        for (let i = 1; i <= res.data.totalPages; i++) {
            const li = document.createElement("li");
            li.className = "page-item";
            const a = document.createElement("a");
            a.className = "page-link";
            a.href = "#";
            a.innerText = i;
            a.onclick = () => getAllExpenses(i);
            li.appendChild(a);
            paginationUL.appendChild(li);
        }

        currentPage = page;
    } catch (err) { console.log(err); }
}


async function formData(event) {
    event.preventDefault();
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    // add leading zeros to day and month if needed
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // create the date string in date-month-year format
    const dateStr = `${formattedDay}-${formattedMonth}-${year}`;
    const date = dateStr;

    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const obj = { date, amount, description, category };
    try {
        const token = localStorage.getItem('accessToken')
        axios.post("/post-expense", obj, { headers: { "Authorization": token } })
            .then(res => { window.location.reload(); })
    } catch (err) { console.log(err) }
}

function deleteFunction(e, expensesId) {
    const deletedObj = { id: expensesId }
    alert(`delete id : ${expensesId}`)
    const token = localStorage.getItem('accessToken');
    axios.post('/delete-expense', deletedObj, { headers: { "Authorization": token } })
    window.location.reload();
}

// payment method..............

document.getElementById('rzp-button1').onclick = async function (e) {
    try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get('/purchaseMemberShip', { headers: { "Authorization": token } })
        console.log("response:", res.data.order);
        var options = {
            key: res.data.key_id, // Enter the Key ID generated from the Dashboard
            order_id: res.data.order.id,// For one time payment
            handler: async function (response) { // This handler function will handle the success payment
                const res = await axios.post('/updatetransactionstatus',
                    {
                        order_id: options.order_id,
                        payment_id: response.razorpay_payment_id,
                    }, { headers: { "Authorization": token } })
                console.log("options.handler :", options.handler);
                console.log('options :', options);
                alert("Premium Membership Successful Buy . Login Again!");
                window.location.href = "/";
                // localStorage.setItem("isPremium",);
            },
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();

        rzp1.on("payment.failed", async function (response) {
            try {
                const res = await axios.post("/updatetransactionstatus",
                    {
                        order_id: options.order_id,
                        payment_failed: true,
                    }, { headers: { Authorization: token } });
                console.log(res);
                alert("Something went wrong");
            } catch (error) { console.log(error) }
        });
    } catch (err) { console.log(err) }
}

function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        window.atob(base64).split("").map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join("")
    );
    return JSON.parse(jsonPayload);
}

logoutBtn.addEventListener("click", logout);
async function logout() {
    try {
        localStorage.clear();
        window.location.href = "/";
    } catch (error) { console.log(error); }
}

document.addEventListener("DOMContentLoaded", isPremiumUser);
document.addEventListener("DOMContentLoaded", () => getAllExpenses(currentPage));