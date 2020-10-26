document.addEventListener("DOMContentLoaded", function() {
    // Activate sidebar nav
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    // Load page content
    const page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);



    function loadPage(page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                const content = document.querySelector("#body-content");
                if (this.status == 200) {

                    content.innerHTML = xhttp.responseText;
                    if (page === "home", "business_partner", "contact", "galery") {
                        const slideIndex = 0;
                        showSlides();

                        function showSlides() {
                            var i;
                            const slides = document.getElementsByClassName("mySlides");
                            for (i = 0; i < slides.length; i++) {
                                slides[i].style.display = "none";
                            }
                            slideIndex++;
                            if (slideIndex > slides.length) { slideIndex = 1 }
                            slides[slideIndex - 1].style.display = "block";
                            setTimeout(showSlides, 5000);
                        }


                    }


                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }

    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });
            }
            // Daftarkan event listener untuk setiap tautan menu
            document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
                elm.addEventListener("click", function(event) {
                    // Tutup sidenav
                    sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();
                    // Muat konten halaman yang dipanggil
                    page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                });
            });
        };


        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
});