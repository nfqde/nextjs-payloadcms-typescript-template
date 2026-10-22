import {useReducer} from 'react';

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

    it('calls the updated function after rerendering', () => {
        let func = cy.spy().as('debouncedFunction');
        const updatedFunc = cy.spy().as('updatedDebouncedFunction');
        const timeout = 500;

        cy.clock(0, ['setTimeout', 'clearTimeout']);

        cy.mountHooks(
            () => useDebounce(func, timeout),
            () => useReducer((renderCount: number) => renderCount + 1, 0)
        ).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');

            cy.mount(<MockComponent />);
        }).then(() => {
            cy.get('@values').its('current.1.1').then((rerender: () => void) => {
                func = updatedFunc;

                rerender();
            });
        }).then(() => {
            cy.get('@values').its('current.1.0').should('equal', 1);
            cy.get('@values').its('current.0').invoke('call', null);
        }).then(() => {
            cy.get('@debouncedFunction').should('not.have.been.called');
            cy.get('@updatedDebouncedFunction').should('not.have.been.called');

            cy.tick(timeout);

            cy.get('@updatedDebouncedFunction').should('have.been.calledOnce');
            cy.get('@debouncedFunction').should('not.have.been.called');
        });
    });

    it('uses the updated timeout after rerendering', () => {
        const func = cy.spy().as('debouncedFunction');
        let timeout = 500;
        const updatedTimeout = 100;

        cy.clock(0, ['setTimeout', 'clearTimeout']);

        cy.mountHooks(
            () => useDebounce(func, timeout),
            () => useReducer((renderCount: number) => renderCount + 1, 0)
        ).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');

            cy.mount(<MockComponent />);
        }).then(() => {
            cy.get('@values').its('current.1.1').then((rerender: () => void) => {
                timeout = updatedTimeout;

                rerender();
            });
        }).then(() => {
            cy.get('@values').its('current.1.0').should('equal', 1);
            cy.get('@values').its('current.0').invoke('call', null);
        }).then(() => {
            cy.tick(updatedTimeout - 1);

            cy.get('@debouncedFunction').should('not.have.been.called');

            cy.tick(1);

            cy.get('@debouncedFunction').should('have.been.calledOnce');
        });
    });
});