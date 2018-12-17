export class ArticleParser {
    get articles() {
        return (window.config || {}).articles;
    }

    get tags() {
        return (this.articles || [])
            .reduce((articlesMap, article) => {
                article.tags.forEach(tag => {
                    const articleDetails = articlesMap[tag] || {name: tag, count: 0, articles: []};
                    articleDetails.count++;
                    articleDetails.articles.push(article);
                    articlesMap[tag] = articleDetails;
                });
                return articlesMap;
            }, {});
    }
}