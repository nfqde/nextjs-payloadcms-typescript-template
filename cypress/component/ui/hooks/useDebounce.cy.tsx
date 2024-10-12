import {useDebounce} from 'UI/hooks/useDebounce';

describe('useDebounce Hook', () => {
    it('should be a function', () => {
        expect(useDebounce, 'useDebounce').to.be.a('function');
    });

    it('gives an function back', () => {
        const func = cy.spy().as('debouncedFunction');
        const timeout = 500;

        cy.mountHook(() => useDebounce(func, timeout)).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');

            cy.mount(<MockComponent />);
        }).then(() => {
            cy.get('@values').its('current').should('be.a', 'function');
        });
    });

    it('delays the execution of the passed function by the specified timeout', () => {
        const func = cy.spy().as('debouncedFunction');
        const timeout = 500;

        cy.mountHook(() => useDebounce(func, timeout)).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');

            cy.mount(<MockComponent />);
        }).then(() => {
            cy.get('@values').invoke('current');
            cy.get('@values').invoke('current');
            cy.get('@values').invoke('current');
        }).then(() => {
            cy.get('@debouncedFunction').should('not.have.been.called');

            // eslint-disable-next-line promise/no-nesting
            cy.wait(timeout).then(() => {
                cy.get('@debouncedFunction').should('have.been.calledOnce');
            });
        });
    });
});