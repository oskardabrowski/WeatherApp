import names from './names';

export const startLoader = () => {
    names.loader.classList.remove('dnone');
}
export const stopLoader = () => {
    names.loader.classList.add('dnone');
}