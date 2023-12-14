import renderer from 'react-test-renderer';
import { describe, it, expect } from "vitest";
import { InputForm } from '..';
import { toJson } from '../../../../tests/utils';


describe('InputForm', () => {
    it('Snapshot default do componente de input de formulário', () => {
        const component = renderer.create(<InputForm placeholder='Nome do usuário'/>);
        const tree = toJson(component);
        expect(tree).toMatchSnapshot();
    });
});