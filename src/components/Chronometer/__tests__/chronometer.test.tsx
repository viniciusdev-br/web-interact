import renderer from 'react-test-renderer';
import { describe, expect, it } from "vitest";
import { Chronometer } from '..';
import { toJson } from '../../../../tests/utils';

describe('Chronometer', () => {
    it('Renderiza componente de Chronometro', () => {
        const component = renderer.create(<Chronometer />);
        const tree = toJson(component);
        expect(tree).toMatchSnapshot();
    });
});