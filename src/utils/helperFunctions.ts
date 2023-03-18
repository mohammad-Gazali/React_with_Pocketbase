export const getAvatarUrl = (url: string, collectionId: string, userId: string, avatarImageName: string, username: string): string => {
    if (avatarImageName) {
        return `${url}/api/files/${collectionId}/${userId}/${avatarImageName}`
    } else {
        return `https://placehold.co/50X50/deeppink/white?text=${username[0].toUpperCase()}`
    }
}

export const hasThisPostLikeFromThisUser = (likes: any[], userId: string) => {
    return likes.filter((like: any) => like.user === userId).length !== 0
}

export const wait = async (ms: number) => {
    return new Promise((resolve, reject) => setTimeout(resolve, ms))
}