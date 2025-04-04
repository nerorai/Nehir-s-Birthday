document.addEventListener("DOMContentLoaded", function() {
  const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
  
  const languageSelector = document.getElementById("language-selector");
  if (languageSelector) {
    languageSelector.value = savedLanguage;
    loadLanguage(savedLanguage);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var birthdayCard = document.querySelector(".birthdayCard");
  birthdayCard.classList.remove("visible");
  birthdayCard.classList.remove("shifted");

  var toggleButton = document.querySelector(".card-toggle");
  toggleButton.checked = false;

  const fourthLayerAnimation = document.getElementById("bizcocho_3");

  fourthLayerAnimation.addEventListener("endEvent", function () {
    const notification = document.getElementById("notification");
    notification.classList.add("show");

    notification.addEventListener("click", function () {
      birthdayCard.classList.add("visible");
    });
  });
});

document.querySelector(".x-btn").addEventListener("click", function () {
  var birthdayCard = document.querySelector(".birthdayCard");
  birthdayCard.classList.remove("visible");
});

document.querySelectorAll("*").forEach((el) => {
  if (el.offsetWidth > document.documentElement.clientWidth) {
    console.log("Overflowing element:", el);
  }
});

function scrollToBottom() {
  const element = document.documentElement; 
  element.scrollTop = element.scrollHeight;
}

setTimeout(scrollToBottom, 0);

const card = document.querySelector(".birthdayCard");
const toggleButton = document.querySelector(".card-toggle");

toggleButton.addEventListener("change", () => {
  if (toggleButton.checked) {
    card.classList.add("shifted");
  } else {
    card.classList.remove("shifted");
  }
});

let isFirstClick = true;

openButton.addEventListener("click", () => {
  if (isFirstClick) {
    createPopupMessage(
      "mocking_nehir",
      [
        {
          id: "m1",
          textKey: "mocking_thanks",
          action: () => {
            createPopupMessage(
              "mocking_thanks_reply",
              [{ id: "m3", textKey: "continue", action: () => {} }],
              40
            );
          },
        },
        {
          id: "m2",
          textKey: "seriously",
          action: () => {
            createPopupMessage(
              "seriously_reply",
              [{ id: "m4", textKey: "continue", action: () => {} }],
              40
            );
          },
        },
      ],
      50
    );
    isFirstClick = false;
    setTimeout(() => {
      const notification2 = document.getElementById("notification2");
      notification2.classList.add("show");
    }, 5000);
  }
});

notification2.addEventListener("click", function () {
  createPopupMessage(
    "reminder",
    [
      { id: "m5", textKey: "stay", action: () => {
      } },
      {
        id: "m6",
        textKey: "suna",
        action: () => {
          window.location.href = "suna_gift.html";
        },
      },
    ],
    40
  );
});

document.getElementById('secretbutton').addEventListener('click', function() {
  const textToCopy = `HiNhr
 Uu aa lu ei i aılmyroaiisnaabnhrzmnkdr ia aıtlyı.V ei aed,Nhr l rjm atmdğmgn iei
  Ozmna e eitrehkıd ibrşybliodm sıd ubnmaaoaı iedğli(aad ei) m olm edğrhrşyeigl aaıbrdnymkznı. 
 iio uu,alnadğmgnnii iel ilkebrRGouu(mr ii amy lnaıtm i at ouc ğatm m e eiörne çnytrnezmnmyku uyze ir pa te oud adm
  Nye şemsl uoouuypaabşaıı l ü aketmk:"ei,bnmglcğm ekryrm yılğ ölnid.
  Blyru,kryrmii i eei ot.Snomsyı,ou amy aaytı luuufr te ekdrzmnaıd imyrm
  Ee a lrkn ee seiiialmdya,it ıavriou
 i:Stn amm alyrkbn o al eei aadrı—ei çnhr'l'çkdğri
 k:Zhiiadnatnv eibrou eitrcs laaynedri. Ü:Sn osz aa inta lcğm
  Bnic lu see,aauaı e esnnkdrnegzlbrdğşki aaimşmi.
uay eic,oul errakdşomy üüeii ii?İiii yıklaıhçdğuglio..err Brd,sn eieypa çnçkhycnıd,kmnhtl luuubliou,oyze knznd ul luuuvraaaı.Snüeiedşn a,dzlmkii dma,snyşlıı aıc  aüeiedşn aaatr üütakdşnkyeiibl ouu raalrmznaksna ouuu,aae zna uad üüekrıdrst.
Brd klaSn'aakdşaıl alşre a i eeldr iidnSHHFBJJHBHB
hts/v.itkcmZrYba"cp h iki ei,
 znzmnod,dğlm?Htraıo lblri m e e aa aeebrztknııdm esnnsyne ei,ikpoeiypı—ou üüstn. 
  aalrwbglşim aknahçi e imyru.Alnab ei n dğmbl eid hl adğl,aakdaav ie e el liibyğ i eei aadm
  Blyrmsn sıd ou üü çnstyebrit i P yn Ooigb)ypaıpalmşı.Brhfabynaurşı,aahrşy ğemkii eeic aaı ot,b üdnfkiitlemkzrnaklı. 
 es,it eeeş— yn amy aldğmikgnfr ti i Nhr ei eeeiiv aieiiadnıaynedri" 
 iiosn aiei çnbrhdfmyku e laadn ynypaadh aknodğm akemmn aa aa lrıbliou. 
 ğrtmoaa edmkitdğm naaısn şeks esyn: Br ieiypaısğaaa aaçkfzadnymkznıdnbnmii e ik o eel. İi inm yıltı ebn i ynglşiiiiomy ölnidn
 ç aasnuakdrmnetroaaı. 
 ecleosnitmm m mrmbnd ei aeid üe i eiilkypbliidr
Sn'aglne nnatka raa laıdşnblrmsn knznar ams i or emyr.tka. i e aahdy amkii o eealyı ii aaıodğn imyrm  üdniiii esçuodğn asycğm e zrn üeiyp üete çnaı t e ei şkyknaod zrn üeiypckı.Drs raaı ımtn i,çğmzakdşaııı raıdnknşrz m naıdnSn ayzn aş üütü
(i eoud uay raalrnaykaıkntmbrçt ieigbyi JBDJSSDFSF)"tp:/ttko.o/SkLq/ oyteln`;    navigator.clipboard.writeText(textToCopy)
      .then(() => {
          this.textContent = 'Copied!';          
          setTimeout(() => {
            createPopupMessage(
              "secretbutton_message",
              [
                { id: "m7", textKey: "okay", action: () => {
                } }
              ],
              40
            );
              this.textContent = 'Hi';
          }, 2000);
      })
      .catch(err => {
          console.error('Failed to copy: ', err);
          this.textContent = 'Error!';
          this.style.backgroundColor = '#f44336'; 
      });
});



