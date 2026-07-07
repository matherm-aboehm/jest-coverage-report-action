declare module '*.md' {
    const text: string;

    export default text;
}

declare module 'jiti' {
    export * from 'jiti/static';
}
