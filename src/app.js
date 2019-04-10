import $ from "jquery";
import "./jqcloud";

import {ArticleParser} from "./article-parser";
import {HTMLRender} from "./html-render";

$(document).ready(() => {

    const articleParser = new ArticleParser();
    const htmlRender = new HTMLRender();

    const articles = articleParser.articles || {};
    const tags = articleParser.tags || {};
    const wordCloud = [];

    Object.keys(tags).forEach(tag => {
        const {name, count} = tags[tag];
        wordCloud.push({text: name, weight: count, link: `/blog.html?tag=${name}`});
    });

    if (location.pathname !== "/") {
        htmlRender.displayHeader();
        htmlRender.displayMainPage(articles);
        htmlRender.addArticleIndexSection();

        setTimeout(() => {
            $('#tags').jQCloud(wordCloud, {
                autoResize: true
            });
        }, 1000);

        /*setTimeout(() => {
            $('#tags').jQCloud(wordCloud, {
                autoResize: true,
                colors: ["#33e746", "#2bcd79", "#ffd54f", "#ffca28", "#ffc107", "#ffb300", "#ffa000", "#ff8f00", "#f57f17"]
            });
        }, 1000);*/

    }
});

$(window).scroll(function () {
    const pos = $(window).scrollTop();
    const maxTop = location.pathname === "/" ? 400 : 180;

    if (pos > maxTop) {
        /*$(".menu-link").css({
            color: "#1565C0",
        });*/
        $(".menu").css({
            background: "#20546b",
            width: "100%"
        });
    } else {
       /* $(".menu-link").css({
            color: "#ffffff",
        });*/
        $(".menu").css({
            background: "transparent",
            width: "0"
        });
    }
});

