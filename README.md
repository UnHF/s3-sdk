# @unhf/s3-sdk

<!-- automd:badges color=yellow -->

[![npm version](https://img.shields.io/npm/v/@unhf/s3-sdk?color=yellow)](https://npmjs.com/package/@unhf/s3-sdk)
[![npm downloads](https://img.shields.io/npm/dm/@unhf/s3-sdk?color=yellow)](https://npm.chart.dev/@unhf/s3-sdk)

<!-- /automd -->

## 简介

`@unhf/s3-sdk` 是一个专为京东云S3对象存储服务设计的TypeScript SDK。该SDK采用分层架构设计，提供了完整的S3对象存储操作功能，包括存储桶管理、对象上传、下载、删除等核心功能。

## 特性

- 🚀 **TypeScript支持**: 完整的类型定义，提供优秀的开发体验
- 🏗️ **分层架构**: 清晰的代码结构，易于维护和扩展
- 🔐 **安全认证**: 内置京东云S3签名认证机制
- 📦 **轻量级**: 最小化依赖，体积小巧
- 🛠️ **易于使用**: 简洁的API设计，快速上手

## 架构设计

本SDK采用经典的分层架构模式，各层职责清晰：

```
┌─────────────────────────────────────────┐
│                应用层                    │
│           (Application Layer)           │
├─────────────────────────────────────────┤
│              视图对象层                  │
│         (View Object - VO Layer)        │
├─────────────────────────────────────────┤
│             数据传输对象层               │
│    (Data Transfer Object - DTO Layer)   │
├─────────────────────────────────────────┤
│               核心业务层                 │
│           (Core Business Layer)         │
├─────────────────────────────────────────┤
│              HTTP映射层                  │
│           (HTTP Mapper Layer)           │
├─────────────────────────────────────────┤
│               模型对象层                 │
│        (Model Object - MO Layer)        │
├─────────────────────────────────────────┤
│               数据模型层                 │
│            (Data Model Layer)           │
├─────────────────────────────────────────┤
│               抽象基类层                 │
│           (Abstract Base Layer)         │
├─────────────────────────────────────────┤
│               签名认证层                 │
│           (Signature Auth Layer)        │
└─────────────────────────────────────────┘
```

### 各层说明

- **抽象基类层 (Abstract)**: 定义SDK的基础结构和契约
- **签名认证层 (Signature)**: 处理京东云S3的签名认证逻辑
- **数据模型层 (Models)**: 定义基础数据结构和实体模型
- **模型对象层 (MO)**: HTTP响应的原始数据模型
- **HTTP映射层 (Mapper)**: 负责HTTP请求的构建和发送
- **核心业务层 (Core)**: 实现主要业务逻辑和数据转换
- **数据传输对象层 (DTO)**: 定义API输入参数的数据结构
- **视图对象层 (VO)**: 定义API输出结果的数据结构
- **应用层**: 对外暴露的统一接口

## 核心功能

- **存储桶管理**: 查询存储桶列表
- **对象操作**:
  - 上传对象到存储桶
  - 下载对象内容
  - 查询对象列表
  - 删除指定对象

<!-- /automd -->

## 使用示例

### 基础配置

```typescript
import { S3SDK } from "@unhf/s3-sdk";

const s3Client = new S3SDK(
  "your-access-key", // 访问密钥ID
  "your-secret-key", // 密钥
  "your-host", // 主机地址
  "https://your-endpoint", // 服务端点
);
```

### 查询存储桶列表

```typescript
const bucketList = await s3Client.queryBucketList();
console.log(bucketList);
```

### 查询对象列表

```typescript
const objectList = await s3Client.queryObjectList({
  bucketName: "my-bucket",
  options: {
    prefix: "folder/",
    "max-keys": "100",
  },
});
console.log(objectList);
```

### 上传对象

```typescript
const fileBuffer = Buffer.from("Hello, S3!");
const uploadResult = await s3Client.uploadObject({
  bucketName: "my-bucket",
  objectName: "path/to/file.txt",
  file: fileBuffer,
});
console.log(uploadResult);
```

### 下载对象

```typescript
const objectData = await s3Client.queryObject({
  bucketName: "my-bucket",
  objectName: "path/to/file.txt",
});
console.log(objectData);
```

### 删除对象

```typescript
const deleteResult = await s3Client.removeObject({
  bucketName: "my-bucket",
  objectName: "path/to/file.txt",
});
console.log(deleteResult);
```

## 安装

Install the package:

```sh
npm install @unhf/s3-sdk

# yarn
yarn add @unhf/s3-sdk

# pnpm
pnpm install @unhf/s3-sdk

# bun
bun add @unhf/s3-sdk
```

Import:

<!-- automd:jsimport cjs src=./src/index.ts -->

**ESM** (Node.js, Bun, Deno)

```js
import { S3SDK } from "@unhf/s3-sdk";
```

**CommonJS** (Legacy Node.js)

```js
const { S3SDK } = require("@unhf/s3-sdk");
```

<!-- /automd -->

## API参考

### S3SDK类

主要的SDK类，提供所有S3操作方法。

#### 构造函数

```typescript
new S3SDK(accessKey: string, secretKey: string, host: string, endpoint: string)
```

#### 方法

- `queryBucketList(): Promise<BucketListVO>` - 查询存储桶列表
- `queryObjectList(params: QueryObjectListDTO): Promise<ObjectListVO>` - 查询对象列表
- `uploadObject(params: UploadObjectDTO): Promise<UploadObjectVO>` - 上传对象
- `queryObject(params: QueryObjectDTO): Promise<QueryObjectVO>` - 查询对象内容
- `removeObject(params: RemoveObjectDTO): Promise<DeleteObjectVO>` - 删除对象

### 类型定义

#### QueryObjectListDTO

```typescript
interface QueryObjectListDTO {
  bucketName: string;
  options?: {
    marker?: string; // 分页标记
    "max-keys"?: string; // 最大返回数量
    prefix?: string; // 前缀过滤
    delimiter?: string; // 分隔符
  };
}
```

#### UploadObjectDTO

```typescript
interface UploadObjectDTO {
  bucketName: string;
  objectName: string;
  file: Buffer<ArrayBufferLike>;
}
```

## 开发

<details>

<summary>local development</summary>

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

</details>

## License

<!-- automd:contributors license=MIT -->

Published under the [MIT](https://github.com/UnHF/s3-sdk/blob/main/LICENSE) license.
Made by [community](https://github.com/UnHF/s3-sdk/graphs/contributors) 💛
<br><br>
<a href="https://github.com/UnHF/s3-sdk/graphs/contributors">
<img src="https://contrib.rocks/image?repo=UnHF/s3-sdk" />
</a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
