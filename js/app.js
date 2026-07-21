/*====================================================
 BURSA HAKİMEVİ DİJİTAL MENÜ
 app.js
====================================================*/

let menuData = [];

/* MENU.JSON OKU */
async function loadMenu() {

    try {

        const response = await fetch("data/menu.json");

        menuData = await response.json();

        return menuData;

    } catch (e) {

        console.error("menu.json okunamadı.", e);

        return [];

    }

}

/* URL PARAMETRESİ */

function getParameter(name){

    const url = new URLSearchParams(window.location.search);

    return url.get(name);

}

/* PARA FORMATLA */

function fiyatFormat(fiyat){

    return new Intl.NumberFormat("tr-TR",{

        style:"currency",

        currency:"TRY"

    }).format(fiyat);

}

/* KATEGORİ ADLARI */

function kategoriAdi(kategori){

    const kategoriler={

        unlumamuller:"🥩 Simit, poğaça, açma",

        tost:"🍕 Tost ve Köfteler",

        icecek:"🥤 İçecekler",
     

    };

    return kategoriler[kategori] || kategori;

}

/* KATEGORİYE GİT */

function kategoriGit(kategori){

    location.href="hurunler.html?hkategori="+kategori;

}

/* ÜRÜN DETAYINA GİT */

function urunGit(id){

    location.href="hurun.html?id="+id;

}

/* ÜRÜN ARA */

function urunAra(liste,kelime){

    kelime=kelime.toLowerCase();

    return liste.filter(u=>{

        return(

            u.ad.toLowerCase().includes(kelime)

            ||

            u.icerik.toLowerCase().includes(kelime)

        );

    });

}

/* ÜRÜN KARTI */

function urunKart(urun){

return `

<div class="col-lg-4 col-md-6 mb-4">

<div class="productCard"

onclick="urunGit(${urun.id})">

<img src="${urun.resim}"

onerror="this.src='images/noimage.jpg'">

<div class="productBody">

<div class="productName">

${urun.ad}

</div>

<div class="productInfo">

🔥 ${urun.kalori} kcal

</div>

<div class="productInfo">

${urun.icerik}

</div>

<div class="d-flex

justify-content-between

align-items-center

mt-3">

<div class="price">

${fiyatFormat(urun.porsiyonlar[0].fiyat)}

</div>

<button

class="btn btn-outline-primary">

Detay

</button>

</div>

</div>

</div>

</div>

`;

}

/* ÜRÜNLERİ GÖSTER */

function urunleriYaz(liste,divID){

    const alan=document.getElementById(divID);

    alan.innerHTML="";

    if(liste.length==0){

        alan.innerHTML=`

<div class="alert alert-warning">

Ürün bulunamadı.

</div>

`;

return;

    }

    liste.forEach(u=>{

        alan.innerHTML+=urunKart(u);

    });

}

/* SAYFA BAŞLIĞI */

function sayfaBaslik(yazi){

    document.title="Bursa Hakimevi | "+yazi;

}

/* YUKARI ÇIK */

function yukariCik(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}
