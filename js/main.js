nba = {};
nba.path = 'https://www.balldontlie.io/api/v1/'; //API URL
nba.images = 'images/';
nba.getData = function (test, callBack) {
    $.ajax({
        type: 'GET',
        url: nba.path + test,
        success: function (data) {
            callBack(data);
        },
        complete: function () {
            $('.loader-wrapper').hide();
        }

    });
}


$(document).ready(function () {
    nba.getData('teams/', function (data) {
        nba.teamData(data);
    });
    nba.getData('games/?per_page=100&', function (data) {
        nba.gameData(data);
    });
    nba.bindEvent();
});


nba.gameData = function (data) {
    for (let i = 0; i < data.data.length; i++) {

        var date = data.data[i].date.split('T')[0];


        var markup = `<div class="swiper-slide"><div class="fixtures__box"><div class="fixtures__boxHead"><div class="fixtures__date"> <span>${date}</span></div><div class="fixtures__status"> <span>${data.data[i].status}</span></div></div><div class="fixtures__container"><div class="fixtures__content team__A"><div class="team__name"> <span class="fullName">${data.data[i].home_team.name}</span> <span class="shortName">${data.data[i].home_team.abbreviation}</span></div><div class="team__logo"> <img src="${nba.images}/teams/${data.data[i].home_team.id}.png" alt="${data.data[i].home_team.full_name}"></div></div><div class="fixtures__content team__vs"><div class="team__left"> <span>${data.data[i].home_team_score}</span></div><div class="team__center"><div class="vs-svg"> <svg class="svg-bg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 241.5 300" style="enable-background:new 0 0 241.5 300;" xml:space="preserve"> <path d="M241.4,43.8C168.9,31.7,167.1,31,120.3,0C85.5,28.4,44.2,39.9,0.1,43.4c0,30-0.2,59.2,0.1,88.5c0.3,29.7,7.6,57.8,21.5,84.1 c21,39.7,52.2,67.9,94.5,83.4c2.7,1,6.2,0.8,9.1,0c4.6-1.3,9.1-3.1,13.4-5.2c56.3-27.9,89.2-73.6,99.7-134.9 c3.5-20.3,2.6-41.5,3.1-62.3C241.8,79.3,241.4,61.7,241.4,43.8z"></path> </svg> <span class="vs-txt">vs</span></div><div class="time"> <span>${data.data[i].time}</span></div></div><div class="team__right"> <span>${data.data[i].visitor_team_score}</span></div></div><div class="fixtures__content team__B"><div class="team__name"> <span class="fullName">${data.data[i].visitor_team.name}</span> <span class="shortName">${data.data[i].visitor_team.abbreviation}</span></div><div class="team__logo"> <img src="${nba.images}/teams/${data.data[i].visitor_team.id}.png" alt="${data.data[i].visitor_team.full_name}"></div></div></div></div></div>`;
        $('body').find('.fixtures-swiper-container .swiper-wrapper').append(markup);


        var scoes = `<div class="fixtures__box"><div class="fixtures__boxHead"><div class="fixtures__date"> <span>${date}</span></div><div class="fixtures__status"> <span>${data.data[i].status}</span></div></div><div class="fixtures__container"><div class="fixtures__content team__A"><div class="team__name"> <span class="fullName">${data.data[i].home_team.name}</span> <span class="shortName">${data.data[i].home_team.abbreviation}</span></div><div class="team__logo"> <img src="${nba.images}/teams/${data.data[i].home_team.id}.png" alt="${data.data[i].home_team.full_name}"></div></div><div class="fixtures__content team__vs"><div class="team__left"> <span>${data.data[i].home_team_score}</span></div><div class="team__center"><div class="vs-svg"> <svg class="svg-bg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 241.5 300" style="enable-background:new 0 0 241.5 300;" xml:space="preserve"> <path d="M241.4,43.8C168.9,31.7,167.1,31,120.3,0C85.5,28.4,44.2,39.9,0.1,43.4c0,30-0.2,59.2,0.1,88.5c0.3,29.7,7.6,57.8,21.5,84.1 c21,39.7,52.2,67.9,94.5,83.4c2.7,1,6.2,0.8,9.1,0c4.6-1.3,9.1-3.1,13.4-5.2c56.3-27.9,89.2-73.6,99.7-134.9 c3.5-20.3,2.6-41.5,3.1-62.3C241.8,79.3,241.4,61.7,241.4,43.8z"></path> </svg> <span class="vs-txt">vs</span></div><div class="time"> <span>${data.data[i].time}</span></div></div><div class="team__right"> <span>${data.data[i].visitor_team_score}</span></div></div><div class="fixtures__content team__B"><div class="team__name"> <span class="fullName">${data.data[i].visitor_team.name}</span> <span class="shortName">${data.data[i].visitor_team.abbreviation}</span></div><div class="team__logo"> <img src="${nba.images}/teams/${data.data[i].visitor_team.id}.png" alt="${data.data[i].visitor_team.full_name}"></div></div></div></div>`;
        $('body').find('.scores .scores__container').append(scoes);
    }

    var swiper = new Swiper('.fixtures-swiper-container', {
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        slidesPerView: 3.5,
        spaceBetween: 30,
        autoplay: {
            delay: 6000,
        },
    });

    


    nba.paginationDom.Init(document.querySelector('.scores__pagination'), {
        size: data.meta.total_pages, // pages  size
        page: data.meta.current_page, // selected page
        step: data.meta.next_page // pages before and after current
    })
}


nba.teamData = function (data) {
    for (let i = 0; i < data.data.length; i++) {
        /* console.log(data.data[i]); */
        var conference = data.data[i].conference.replace(/\s+/g, '').toLowerCase();

        var markup = `<div class="club" data-conference="${conference}"> <div class="club__container"> <div class="club__logo"> <img src="${nba.images}teams/${data.data[i].id}.png" alt="${data.data[i].full_name}"> </div><div class="club__name"> <span class="fullName">${data.data[i].full_name}</span> </div></div></div>`;

        if (conference === 'east') {
            $('body').find('#east.tab__pane > .clubBox').append(markup);
        } else if (conference === 'west') {
            $('body').find('#west.tab__pane > .clubBox').append(markup);
        }

        var selectdrpDwnClub = `<option value="${data.data[i].name}" data-teamId="${data.data[i].id}">${data.data[i].name}</option>`;

        var listDrpDwnClub = `<li data-teamId="${data.data[i].id}">${data.data[i].name}</li>`


        $('body').find('.drpDwn.clubs .drpDwn__value select').append(selectdrpDwnClub);
        $('body').find('.drpDwn.clubs .drpDwn__list ul').append(listDrpDwnClub);

    }

}

nba.bindEvent = function () {
    $('body').on('click', '.tab__list a', function (e) {
        e.preventDefault();
        $('.tab__list li').removeClass('active');
        $(this).parent().addClass('active');
        var currentTab = $(this).attr('href');
        $('.tab__pane').removeClass('active');
        $(currentTab).addClass('active');
    });

    $('.drpDwn').on('click', function () {
        $(this).toggleClass('active')
    })


    $('body').on('click', '.drpDwn li', function () {
        $(this).parent().parent().siblings().children().first().text($(this).text());

    });


}


nba.pagination = function(data){
    if(data.meta.current_page){
        //code....
        $('body').find('.paginationNumber').on('click',function(){
            console.log('Hi');
        })
    }
    


    for (let i = 1; i <= data.meta.total_pages; i++) {
        console.log(i);
        
    }
}

nba.paginationDom = {
    code: '',

    formatNumber: function (number, classes) {
        return `<li class="paginationItem ${classes}${number===nba.paginationDom.page ? ' active' : ''}" data-num="${number}">${number}</li>`;
    },

    formatEllipsis: function () {
        return '<li class="paginationItem paginationEllipsis">&hellip;</li>';
    },

    formatPrevious: function () {
        return '<li class="paginationItem paginationPrevious">Previous</li>';
    },

    formatNext: function () {
        return '<li class="paginationItem paginationNext">Next</li>';
    },

    add: function (start, end) {
        for (let i = start; i < end; i++) {
            if (i === 1) {               
                nba.paginationDom.code += this.formatNumber(i, 'paginationNumber paginationFirst');
            } else if (i === nba.paginationDom.size) {
                
                nba.paginationDom.code += this.formatNumber(i, 'paginationNumber paginationLast');
            } else {          
                nba.paginationDom.code += this.formatNumber(i, 'paginationNumber');
            }
        }
    },

    last: function () {
        nba.paginationDom.code += this.formatEllipsis();
        nba.paginationDom.code += this.formatNumber(nba.paginationDom.size, 'paginationNumber paginationLast');
    },

    first: function () {
        nba.paginationDom.code += this.formatNumber(1, 'paginationNumber paginationFirst');
        nba.paginationDom.code += this.formatEllipsis();
    },

    onClick: function (e) {
        if (nba.paginationDom.page === +e.target.dataset.num) {
            return;
        }
        
        nba.paginationDom.page = +e.target.dataset.num;
        nba.paginationDom.Start();
    },

    onPrev: function () {
        if (nba.paginationDom.page === 1) {
            return;
        }
        nba.paginationDom.page--;
        nba.paginationDom.Start();
    },

    onNext: function () {
        if (nba.paginationDom.page === nba.paginationDom.size) {
            return;
        }
        nba.paginationDom.page++;
        nba.paginationDom.Start();
    },
    // --------------------
    // Script
    // --------------------

    // binding pages
    Bind: function () {
        const a = nba.paginationDom.e.getElementsByClassName('paginationNumber');
        for (let i = 0; i < a.length; i++) {
            a[i].addEventListener('click', nba.paginationDom.onClick, false);
        }
    },

    // find pagination type
    Start: function () {
        if (nba.paginationDom.size < nba.paginationDom.step * 2 + 6) {

            nba.paginationDom.add(1, nba.paginationDom.size + 1);
        } else if (nba.paginationDom.page <= nba.paginationDom.step * 2 + 2) {

            nba.paginationDom.add(1, nba.paginationDom.step * 2 + 4);
            nba.paginationDom.last();
        } else if (nba.paginationDom.page >= nba.paginationDom.size - nba.paginationDom.step * 2 - 1) {

            nba.paginationDom.first();
            nba.paginationDom.add(nba.paginationDom.size - nba.paginationDom.step * 2 - 2, nba.paginationDom.size + 1);
        } else {

            nba.paginationDom.first();
            nba.paginationDom.add(nba.paginationDom.page - nba.paginationDom.step, nba.paginationDom.page + nba.paginationDom.step + 1);
            nba.paginationDom.last();
        }

        const html = `<ul class="paginationList">${this.formatPrevious()}${nba.paginationDom.code}${this.formatNext()}</ul>`;
        nba.paginationDom.e.innerHTML = html;

        nba.paginationDom.code = '';
        nba.paginationDom.Bind();
        nba.paginationDom.Buttons();
    },

    Buttons: function (e) {
        nba.paginationDom.e.getElementsByClassName('paginationPrevious')[0].addEventListener('click', nba.paginationDom.onPrev, false);
        nba.paginationDom.e.getElementsByClassName('paginationNext')[0].addEventListener('click', nba.paginationDom.onNext, false);
    },

    // init
    Init: function (e, data) {
        data = data || {};
        nba.paginationDom.size = data.size;
        nba.paginationDom.page = data.page || 1;
        nba.paginationDom.step = data.step || 3;
        nba.paginationDom.e = e;
        nba.paginationDom.Start();
    }
}