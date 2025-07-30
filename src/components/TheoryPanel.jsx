import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TheoryPanel = ({ algorithm }) => {
  const algorithmInfo = {
    FIFO: {
      name: 'First In First Out (FIFO)',
      definition: 'The FIFO algorithm replaces the page that has been in memory for the longest time (oldest page).',
      steps: [
        'Maintain pages in the order they were loaded',
        'When a page is referenced:',
        '  • If in memory → Page Hit',
        '  • Else → Page Fault',
        '    - Remove the oldest page (first in)',
        '    - Add the new page to the end'
      ],
      timeComplexity: [
        'O(f) per reference (where f = frame size)',
        'O(1) if using HashSet + Queue'
      ],
      analogy: 'Like a queue at a store - first person in line is first to be served (removed).',
      strengths: [
        'Simple to implement',
        'Low overhead',
        'Fair - oldest pages are replaced first'
      ],
      weaknesses: [
        'Doesn\'t consider page usage patterns',
        'May replace frequently used pages',
        'Can suffer from Belady\'s anomaly'
      ],
      useCases: [
        'Simple systems with limited memory',
        'When implementation simplicity is key',
        'Systems without usage tracking'
      ],
      color: 'bg-blue-100 text-blue-800'
    },
    LRU: {
      name: 'Least Recently Used (LRU)',
      definition: 'The LRU algorithm replaces the page that has not been used for the longest period of time.',
      steps: [
        'Maintain a list of pages in order of recent use',
        'When a page is referenced:',
        '  • If in memory → Page Hit',
        '    - Move page to most recent position',
        '  • Else → Page Fault',
        '    - Remove the least recently used page',
        '    - Add new page as most recent'
      ],
      timeComplexity: [
        'O(1) per reference using HashMap + Doubly Linked List',
        'O(f) if using simple List without hashing'
      ],
      analogy: 'Like organizing books on your desk - books you haven\'t touched in a while get moved to storage.',
      strengths: [
        'Good locality of reference',
        'Performs well for most programs',
        'Considers actual usage patterns'
      ],
      weaknesses: [
        'More complex to implement',
        'Higher overhead for tracking',
        'May not work well with sequential scans'
      ],
      useCases: [
        'General-purpose operating systems',
        'Cache systems',
        'When recent usage predicts future usage'
      ],
      color: 'bg-green-100 text-green-800'
    },
    Optimal: {
      name: 'Optimal (Furthest Future Use)',
      definition: 'The Optimal algorithm replaces the page that will not be used for the longest period in the future.',
      steps: [
        'Look ahead in the reference string',
        'When a page is referenced:',
        '  • If in memory → Page Hit',
        '  • Else → Page Fault',
        '    - Find the page used furthest in future',
        '    - If a page is never used again, replace it',
        '    - Otherwise, replace furthest future use'
      ],
      timeComplexity: [
        'O(n) per page fault',
        'n = number of future references scanned (lookahead window)'
      ],
      analogy: 'Like a fortune teller who knows the future - always makes the perfect choice for replacement.',
      strengths: [
        'Theoretically optimal',
        'Minimum possible page faults',
        'Best possible performance benchmark'
      ],
      weaknesses: [
        'Impossible to implement practically',
        'Requires knowledge of future references',
        'Only useful for comparison/analysis'
      ],
      useCases: [
        'Theoretical analysis',
        'Performance benchmarking',
        'Algorithm comparison studies'
      ],
      color: 'bg-purple-100 text-purple-800'
    }
  };

  const info = algorithmInfo[algorithm];

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Algorithm Theory
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Badge className={`${info.color} mb-2`}>
            {info.name}
          </Badge>
          <p className="text-sm text-gray-700 leading-relaxed">
            {info.definition}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">How it works:</h4>
          <ol className="text-sm text-gray-700 space-y-1">
            {info.steps.map((step, index) => (
              <li key={index} className={step.startsWith('  ') ? 'ml-4 text-gray-600' : ''}>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Time Complexity:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {info.timeComplexity.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Real-world Analogy:</h4>
          <p className="text-sm text-gray-700 italic">
            {info.analogy}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-green-700 mb-2">Strengths:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {info.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-red-700 mb-2">Weaknesses:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {info.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                {weakness}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Best Used For:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {info.useCases.map((useCase, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                {useCase}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TheoryPanel;
