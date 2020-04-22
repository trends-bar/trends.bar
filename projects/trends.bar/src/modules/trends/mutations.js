import gql from "graphql-tag";

export const CREATE_TREND = gql`
    mutation CreateTrend($trendId: String!, $username: String!) {
        createTrend(trendId: $trendId, username: $username) {
            trendId
            username
        }
    }`;

export const REMOVE_TREND = gql`
    mutation RemoveTrend($trendId: String!, $username: String!) {
        removeTrend(trendId: $trendId, username: $username) {
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
                yValueSubGroup
                yValueGroup
                type
                cumulative
                values {
                    x
                    y
                }
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

export const REMOVE_SCRIPT = gql`
    mutation ScriptRemove($scriptName: String!, $trendId: String!, $username:String!) {
        scriptRemove(scriptName: $scriptName, trendId: $trendId, username: $username ) {
            filename
            text
        }
    }`;

export const RENAME_SCRIPT = gql`
    mutation ScriptRename($scriptName: String!, $trendId: String!, $username:String!, $newName:String!) {
        scriptRename(scriptName: $scriptName, trendId: $trendId, username: $username, newName: $newName ) {
            filename
            text
        }
    }`;

export const upsertTrendLayout = gql`
    mutation UpsertTrendLayout($trendLayout: TrendLayoutInput) {
        upsertTrendLayout(trendLayout: $trendLayout) {
            _id
        }
    }`;

export const upsertTrendDataSource = gql`
    mutation upsertTrendDataSource($trendId: String!, $username: String!, $dataSource: DataSourceInput!) {
        upsertTrendDataSource(trendId: $trendId, username: $username, dataSource: $dataSource) {
            _id
        }
    }`;
