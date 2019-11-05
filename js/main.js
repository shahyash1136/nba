nba = {};
nba.path = 'https://www.balldontlie.io/api/v1/'; //API URL
nba.images = 'images/';
nba.players = function () {
    $.ajax({
        type: 'GET',
        url: nba.path + 'players/',
        success: function (data) {
            /* nba.playerData(data); */
        }
    });
}
nba.teams = function () {
    $.ajax({
        type: 'GET',
        url: nba.path + 'teams/',
        success: function (data) {
            nba.teamData(data);
        }
    });
}

nba.score = function () {
    $.ajax({
        type: 'GET',
        url: nba.path + 'games/?per_page=100',
        success: function (data) {
            nba.gameData(data);
        }
    });
}

$(document).ready(function () {
    nba.players();
    nba.teams();
    nba.score();
    nba.bindEvent();
});


nba.gameData = function(data){
    for (let i = 0; i < data.data.length; i++) {
        var markup = `<div class="fixtures__box"><div class="fixtures__boxHead"><div class="fixtures__date"> <span>${data.data[i].date}</span></div><div class="fixtures__status"> <span>${data.data[i].status}</span></div></div><div class="fixtures__container"><div class="fixtures__content team__A"><div class="team__name"> <span class="fullName">${data.data[i].home_team.name}</span> <span class="shortName">${data.data[i].home_team.abbreviation}</span></div><div class="team__logo"> <img src="${nba.images}/teams/${data.data[i].home_team.id}.png" alt="${data.data[i].home_team.full_name}"></div></div><div class="fixtures__content team__vs"><div class="team__left"> <span>${data.data[i].home_team_score}</span></div><div class="team__center"><div class="vs-svg"> <svg class="svg-bg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 241.5 300" style="enable-background:new 0 0 241.5 300;" xml:space="preserve"> <path d="M241.4,43.8C168.9,31.7,167.1,31,120.3,0C85.5,28.4,44.2,39.9,0.1,43.4c0,30-0.2,59.2,0.1,88.5c0.3,29.7,7.6,57.8,21.5,84.1 c21,39.7,52.2,67.9,94.5,83.4c2.7,1,6.2,0.8,9.1,0c4.6-1.3,9.1-3.1,13.4-5.2c56.3-27.9,89.2-73.6,99.7-134.9 c3.5-20.3,2.6-41.5,3.1-62.3C241.8,79.3,241.4,61.7,241.4,43.8z"></path> </svg> <span class="vs-txt">vs</span></div><div class="time"> <span>${data.data[i].time}</span></div></div><div class="team__right"> <span>${data.data[i].visitor_team_score}</span></div></div><div class="fixtures__content team__B"><div class="team__name"> <span class="fullName">${data.data[i].visitor_team.name}</span> <span class="shortName">${data.data[i].visitor_team.abbreviation}</span></div><div class="team__logo"> <img src="${nba.images}/teams/${data.data[i].visitor_team.id}.png" alt="${data.data[i].visitor_team.full_name}"></div></div></div></div>`;


        $('body').find('.fixtures').append(markup);

    }
}

nba.teamData = function (data) {
    for (let i = 0; i < data.data.length; i++) {
        /* console.log(data.data[i]); */
        var conference =  data.data[i].conference.replace(/\s+/g, '').toLowerCase();

        var markup = `<div class="club" data-conference="${conference}"> <div class="club__container"> <div class="club__logo"> <img src="${nba.images}teams/${data.data[i].id}.png" alt="${data.data[i].full_name}"> </div><div class="club__name"> <span class="fullName">${data.data[i].full_name}</span> </div></div></div>`;

        if (conference === 'east') {
            $('body').find('#east.tab__pane > .clubBox').append(markup);
        } else if (conference === 'west') {
            $('body').find('#west.tab__pane > .clubBox').append(markup);
        }
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
    })
}