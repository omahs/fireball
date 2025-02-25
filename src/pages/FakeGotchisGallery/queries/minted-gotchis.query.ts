export const getMintedFakeGotchisQuery = (): string => {
    return `{
        metadataActionLogs(
            first: 1000,
            where:{
                status: 2
            }
            orderBy: timestamp
            orderDirection: desc
        ) {
            id
            artistName
            name
            description
            thumbnailHash
            editions
            externalLink
            createdAt
            likeCount
            status
        }
    }`;
};
