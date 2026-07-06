declare module '*.md' {
    const text: string;

    export default text;
}

declare module 'jiti' {
    export * from 'jiti/static';
}

declare module 'ohash/utils' {
    export * from 'c12/node_modules/ohash';
}
