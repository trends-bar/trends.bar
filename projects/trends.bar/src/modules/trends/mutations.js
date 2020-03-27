import gql from "graphql-tag";

export const CREATE_TREND = gql`
    mutation CreateTrend($trendId: String!, $username: String!) {
        createTrend(trendId: $trendId, username: $username) {
            trendId
            username
        }
    }`;

export const CRAWL_TREND_GRAPH = gql`
    mutation CrawlTrendGraph($scriptName: String!, $script: CrawlingScript!) {
        crawlTrendGraph(scriptName: $scriptName, script: $script) {
            crawledText
            traces
            graphQueries {
                trendId
                username
                title
                label
                subLabel
                type
                dataSequence
                values {
                    x
                    y
                }
            }
            error
            dataset {
                source
                sourceDocument
                sourceName
            }
        }
    }`;

export const UPSERT_TREND_GRAPH = gql`
    mutation UpsertTrendGraph($graphQueries: [GraphQueryInput]) {
        upsertTrendGraph(graphQueries: $graphQueries)
    }`;

export const DELETE_TREND_GRAPH = gql`
    mutation DeleteTrendGraph($trendId: String!, $username: String!) {
        deleteTrendGraph(trendId: $trendId, username: $username)
    }`;

export const SAVE_SCRIPT = gql`
    mutation saveScript($script: CrawlingScript!) {
        saveScript(script: $script)
    }`;

