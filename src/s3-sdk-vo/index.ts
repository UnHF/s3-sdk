interface BaseVO <T> {
    code: number;
    message: string;
    data: T;
}

export interface BucketListVO 
    extends BaseVO<Array<{
        id: number;
        name: string;
        owner: number;
        createTime: string;
        region: string;
    }>> {}
