import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { describe, expect, it } from "vitest";
import { Chronometer } from '..';

function toJson(component: renderer.ReactTestRenderer) {
    const result = component.toJSON()
    expect(result).toBeDefined()
    expect(result).not.toBeInstanceOf(Array)
    return result as renderer.ReactTestRendererJSON
}

describe('Chronometer', () => {
    it('Renderiza componente de Chronometro', () => {
        render(<Chronometer />);
        screen.debug();
        const component = renderer.create(<Chronometer />);
        const tree = toJson(component);
        expect(tree).toMatchSnapshot();
    });
});