export class BucketMapper {
    /**
     * @description 可以通过该操作来列出客户所有的 Bucket 信息。
     */
    getService () {}

    /**
     * @description 该操作可以创建一个新的 Bucket。
     */
    putBucket () {}

    /**
     * @description 删除 URI 所指定的 Bucket，删除该 Bucket 之前，必须确保该 Bucket 中没有任何数据。
     */
    deleteBucket () {}

    /**
     * @description 该操作可以获得指定 Bucket 中的 Object 信息列表，请求时可以通过一些查询条件来限制返回的结果。
     */
    getBucket () {}
}
