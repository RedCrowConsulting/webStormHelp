/**
 * This is the data used whether or not you will be working with generated
 * mock data
 * Seed data that is base to the app
 * must also work with mocked data approach
 * @return { JSON } json data object
 */
export const makeSeedData = () => {
  const shortId = require('shortid');
  return {
    news: [{
      id: shortId.generate(),
      articleIconShortCode: `i`,
      articleTitle: `Data Source`,
      articleBody: `You are now using a mock data API which pairs ` +
        `seed data with generated data that varies widely.
      Your actions persist refresh and are reflected in the generated
       src/api/db.json file being served now - until you restart/rebuild
       your DevFlow. Enjoy!`,
    }],
    newLevelOneContentListings: [{
      id: shortId.generate(),
      title: 'Example title but less than equal 72 char',
      shortDescription: 'less than equal 280 char',
      longDescription: 'a lot of markdown', // TODO: set limit'
      tags: 'using chipComponent perhaps you-know',
      pipelineCounts: {
        new: 1,
        contracted: 0,
        completed: 0,
        archived: 0,
      },
    },
    {
      id: shortId.generate(),
      title: 'Transpiling aside, '+
        'need help converting a nested namespace to ES modules',
      shortDescription: 'Given the example, how would you convert using models',
      longDescription: `# Example GAS code
    ## Four Level NAME$PACE Example for google apps script
    \`\`\`js
    /****
     * 'SEED' THE NAMESPACES
     *****/
    var NAME$PACE1 = (function(ns) {
      ns.author = "Raul Flores, Jr";
      ns.description = "This is an example 4 level namespace."
      ns.value = "some value";
      ns.Enums = {
        ZERO: 0,
        ONE: 1,
        TWO: 2
      };
      ns.doSomething = function() {
        return 100;
      };
      return ns;
    })(NAME$PACE1 || {});

    /****
     * 'POPULATE' THE NAMESPACE - define additional methods and properties
     * Nested level functions
     * to 'nest' a nameNAME$PACE use the pattern, just declare and pass the 
     * nested object when defining the
     * immediately invoked function
     *****/
    (function(nested) {
      /**
       * notes on what was done
       * @return {string} returns statement in string
       */
      nested.subsetOfFunctions1.doSomething = function() {
        return "This is the something that was done.";
      };
      return nested;
    })(NAME$PACE1.GroupingA = {
      subsetOfFunctions1: {}
    });


    function testIt() {
      var x = NAME$PACE1.GroupingA.subsetOfFunctions1.doSomething();
      Logger.log(x);
      Logger.log(JSON.stringify(NAME$PACE1));
    }
    \`\`\`
    TODO: update against DevFlow and give that example too
    `,
      tags: 'GAS',
      pipelineCounts: {
        new: 1,
        contracted: 0,
        completed: 0,
        archived: 0,
      },
    },
    {
      id: shortId.generate(),
      title: 'Example title but less than equal 72 char',
      shortDescription: 'less than equal 280 char',
      longDescription: 'a lot of markdown', // TODO: set limit'
      tags: 'using chipComponent perhaps you-know',
      pipelineCounts: {
        new: 1,
        contracted: 0,
        completed: 0,
        archived: 0,
      },
    },
    ],
    contractedLevelOneContentListings: [{
      id: shortId.generate(),

    }],
    completedLevelOneContentListings: [{
      id: shortId.generate(),

    }],
    archivedLevelOneContentListings: [{
      id: shortId.generate(),

    }],
  };
}; // makeSeedData
