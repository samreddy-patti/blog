import $ from "jquery";
import headerHTML from "./html/header.html";
import assetLinks from "./html/asset-links.html";
import footerHTML from "./html/footer.html";

export class HTMLRender {
    constructor() {
        $("head").append(assetLinks);
        $("body").after(footerHTML);
    }

    displayHeader() {
        $("#header").html(headerHTML);
    }

    addArticleIndexSection() {
        const articleMain = $('#articleMain');
        if (articleMain.length) {
            // this.addSocialButtons();
            this.addArticleIndex();
        }
    }

    displayMainPage(articles = []) {
        const param = decodeURIComponent(location.search || '#').substring(1) || undefined;
        let filter = undefined;
        if (param) {
            filter = (param.split("=") || [undefined, undefined])[1];
        }
        const articleHTML = articles
            .sort((a1, a2) => new Date(a2.date) - new Date(a1.date))
            .reduce((articleHTML, article) => {
                if (!filter || (filter && article.tags.indexOf(filter) != -1)) {
                    return articleHTML + this.getArticleBlock(article);
                } else {
                    return articleHTML;
                }
            }, '');
        $("#main-page-articles").html(articleHTML);
    }


    getArticleBlock(article) {
        const pageLinkResource = `${article.pathPrefix}${article.title.replace(/ /g, '-').toLowerCase()}`;
        const tagsLink = article.tags.reduce((tagsLink, tag) => {
            tagsLink += `<a href="/blog.html?tag=${tag}"> <span class="badge badge-primary">#${tag} </span></a> `;
            return tagsLink;
        }, '');

        return `<div class="col-4 article">
                     <div class="card">
                        <a href="${pageLinkResource}.html">
                            <img class="card-img-top card-img" src="${pageLinkResource}-sm.png" alt="Card image">
                            <div class="img-overlay">
                               
                            </div>
                        </a>
                         <div class="card-header bg-white text-muted border-0">
                          <div class="pull-left"><small>${article.date}</small></div>
                          <div class="pull-right"><small></small></div>
                         </div>
                         <div class="card-body">
                            <div class="link text-center">
                                <div class="p-3 title">
                                   <h5 class="text-dark"><a href="${pageLinkResource}.html">${article.title}</a></h5>
                                </div>
                             </div>
                             <div class>${tagsLink}</div>
                        </div>
                    </div>
               </div>`;
    }

    addArticleIndex() {
        let titles = '';
        $('#articleMain h3').each(function (index) {
            const node = $(this);
            titles += `<div class="pb-2"><a href="#${node.attr('id')}" class="link"><span class="text-white">${node.text()}</span></a></div>`;
        });
        $('#article-body').prepend(`
            <div class="border border-muted pt-3 col-md-2 bg-dark">
                <div class="index-sticky-top">${titles} </div>
            </div>
        `);
    }

    addSocialButtons() {
        const href = `${location.origin}${location.pathname}`;
        $('body').prepend('<div id="fb-root"></div>');
        $('body').append('<div class="fb-like" data-href="href" data-layout="box_count" data-action="like" data-size="large" data-show-faces="false" data-share="true"></div>');
        $('#article-body').append(`
            <div class="container col col-12 p-0">
                <div class="fb-comments" data-width="100%" data-href="${href}" data-numposts="10"></div>
            </div>
        `);
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&autoLogAppEvents=1&version=v3.2&appId=1383896228313059';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
}