import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { describe, expect, it } from "vitest";
import { Chronometer } from '..';
import { toJson } from '../../../../tests/utils';

describe('Chronometer', () => {
    it('Renderiza componente de Chronometro', () => {
        render(<Chronometer />);
        screen.debug();
        const component = renderer.create(<Chronometer />);
        const tree = toJson(component);
        expect(tree).toMatchSnapshot();
    });
});